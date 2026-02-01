'use client';

import { useEffect, useState } from 'react';

export default function AdminComments() {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ FIX: Dashboard variable use kiya localhost hatakar
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  // Comments Fetch Karo
  const fetchComments = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${baseUrl}/admin/comments`, {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json' // InfinityFree compatibility
        }
      });
      
      const data = await res.json();
      // Check if data is array
      setComments(Array.isArray(data) ? data : (data.data || []));
    } catch (error) {
      console.error("Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  // Delete Handler
  const handleDelete = async (id: number) => {
    if(!confirm('Are you sure you want to delete this comment?')) return;

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${baseUrl}/admin/comments/${id}`, {
        method: 'DELETE',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });
      
      if (res.ok) {
        setComments(comments.filter((c: any) => c.id !== id));
        alert('Comment Deleted!');
      }
    } catch (error) {
      console.error("Delete Error:", error);
    }
  };

  if (loading) return <div className="p-10 font-bold text-gray-500 animate-pulse">Loading Comments...</div>;

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Manage Comments 🛡️</h1>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-100 text-gray-600 uppercase text-sm font-bold">
            <tr>
              <th className="p-4 border-b">User</th>
              <th className="p-4 border-b">Comment</th>
              <th className="p-4 border-b">News Title</th>
              <th className="p-4 border-b">Date</th>
              <th className="p-4 border-b">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {comments.map((comment: any) => (
              <tr key={comment.id} className="hover:bg-gray-50 transition">
                <td className="p-4 font-bold text-gray-700">{comment.user?.name || 'Unknown'}</td>
                <td className="p-4 text-gray-600 max-w-xs truncate" title={comment.content}>
                    {comment.content}
                </td>
                <td className="p-4 text-sm text-blue-600 font-medium">
                    {comment.news?.title || 'Deleted News'}
                </td>
                <td className="p-4 text-xs text-gray-400">
                    {new Date(comment.created_at).toLocaleDateString()}
                </td>
                <td className="p-4">
                  <button 
                    onClick={() => handleDelete(comment.id)}
                    className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold hover:bg-red-700 hover:text-white transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {comments.length === 0 && (
            <div className="p-10 text-center text-gray-400">No comments found.</div>
        )}
      </div>
    </div>
  );
}