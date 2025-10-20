import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, addDoc, updateDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '../firebase';

export const useFirebaseNotes = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth.currentUser) {
      setNotes([]);
      setLoading(false);
      return;
    }

    const notesRef = collection(db, 'users', auth.currentUser.uid, 'notes');
    const q = query(notesRef, orderBy('updated_at', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const notesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        created_at: doc.data().created_at?.toDate?.()?.toISOString() || new Date().toISOString(),
        updated_at: doc.data().updated_at?.toDate?.()?.toISOString() || new Date().toISOString(),
      }));
      setNotes(notesData);
      setLoading(false);
    }, (error) => {
      console.error('Error fetching notes:', error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth.currentUser?.uid]);

  const createNote = async (note) => {
    try {
      const notesRef = collection(db, 'users', auth.currentUser.uid, 'notes');
      const docRef = await addDoc(notesRef, {
        ...note,
        created_at: serverTimestamp(),
        updated_at: serverTimestamp(),
      });
      return { id: docRef.id, ...note };
    } catch (error) {
      console.error('Error creating note:', error);
      throw error;
    }
  };

  const updateNote = async (updatedNote) => {
    try {
      const noteRef = doc(db, 'users', auth.currentUser.uid, 'notes', updatedNote.id);
      await updateDoc(noteRef, {
        ...updatedNote,
        updated_at: serverTimestamp(),
      });
      return updatedNote;
    } catch (error) {
      console.error('Error updating note:', error);
      throw error;
    }
  };

  const deleteNote = async (noteId) => {
    try {
      const noteRef = doc(db, 'users', auth.currentUser.uid, 'notes', noteId);
      await deleteDoc(noteRef);
    } catch (error) {
      console.error('Error deleting note:', error);
      throw error;
    }
  };

  return {
    notes,
    loading,
    createNote,
    updateNote,
    deleteNote,
  };
};
