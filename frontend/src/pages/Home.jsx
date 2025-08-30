import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../Context/UserContext";

export default function Home() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newNote, setNewNote] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { setUserData,userData,serverUrl } = useContext(UserDataContext);

  const navigate = useNavigate();

  // delete task
  const deleteTask = async (noteId) => {
    try {
      const res = await axios.delete(
        `${serverUrl}/api/notes/deleteNotes/${noteId}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        // remove deleted note from state
        setNotes(notes.filter((note) => note._id !== noteId));
      }
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  // Fetch notes
  const fetchNotes = async () => {
    try {
      const res = await axios.get(
        `${serverUrl}/api/notes/getAllNotes`,
        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        setNotes(res.data.userAllNotes);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Create note
  const handleCreateNote = async () => {
    if (!newNote.trim()) return;
    setLoading(true);
    try {
      const res = await axios.post(
        `${serverUrl}/api/notes/createNotes`,
        { title: newNote },
        { withCredentials: true }
      );
      if (res.data.success) {
        setNotes([...notes, res.data.newNote]);
        setNewNote("");
        setIsModalOpen(false);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Sign out
  const handleSignOut = async () => {
    try {
      await axios.post(`${serverUrl}/api/auth/logout`, {}, {
        withCredentials: true,
      });
      setUserData(null);
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 px-4 py-6">
      {/* Header */}
      <div className="w-full max-w-[800px] flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <img src="top1.png" alt="Logo" className="h-8" />
          <h1 className="text-lg font-semibold">Dashboard</h1>
        </div>
        <button
          onClick={handleSignOut}
          className="text-blue-600 font-medium hover:underline"
        >
          Sign Out
        </button>
      </div>

      {/* Welcome Card */}
      <div className="w-full max-w-[800px] bg-white rounded-[10px] border border-[#D9D9D9] shadow-md p-4 mb-6">
        <h2 className="text-lg font-semibold text-gray-900">
          Welcome, {userData?.name || "User"} !
        </h2>
        <p className="text-gray-600">
          Email: {userData?.email || "xxxxx@xxxx.com"}
        </p>
      </div>

      {/* Create Note Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="w-full max-w-[800px] h-[52px] bg-[#367AFF] text-white font-medium rounded-[10px] mb-6"
      >
        Create Note
      </button>

      {/* Notes Section */}
      <div className="w-full max-w-[800px]">
        <h3 className="text-lg font-semibold mb-3">Notes</h3>
        <div className="flex flex-col gap-3">
          {notes.map((note) => (
            <div
              key={note._id}
              className="w-full bg-white rounded-[10px] border border-[#D9D9D9] p-4 shadow-sm flex justify-between items-center"
            >
              <span>{note.title}</span>
              <button
                onClick={() => deleteTask(note._id)}
                className="text-red-500 hover:text-red-700"
              >
                <img src="delete.png" alt="delete" className="h-5 w-5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-md">
            <h2 className="text-lg font-semibold mb-4">Create New Note</h2>
            <input
              type="text"
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              placeholder="Enter note title"
              className="w-full border border-gray-300 rounded-lg p-3 mb-4"
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-200 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateNote}
                disabled={loading}
                className="px-4 py-2 bg-[#367AFF] text-white rounded-lg"
              >
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
