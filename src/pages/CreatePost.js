import React, { useState, useEffect, useCallback } from "react";
import {
  addDoc,
  getDocs,
  collection,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db, auth, firestore } from "../firebase-config";
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function CreatePost({ isAuth }) {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");
  const [updatepostListstitle, updatesetPostListtitle] = useState("");
  const [updatepostListsptext, updatesetPostListptext] = useState("");

  // Add a document with the generated ID

  const postsCollectionRef1 = collection(db, "posts");

  let navigate = useNavigate();

  const createPost = async () => {
    await addDoc(postsCollectionRef1, {
      title,
      postText,
      author: {
        name: auth.currentUser.displayName,
        id: auth.currentUser.uid,
      },
    });

    navigate("/");
  };
  const handleEdit = async (e) => {
    try {
      e.preventDefault();
      console.error("An dddddd:", id);

      console.error("An dddddd:", updatepostListstitle);
      const getUser = doc(db, "posts", id);

      await updateDoc(getUser, {
        title: updatepostListstitle,
        postText: updatepostListsptext,
      });

      // console.error("An dddddd:", updatepostLists);
      // // const updateData1 = {
      //   title: updatesetPostList.title,
      //   postText: updatesetPostList.postText,
      // };
      // console.log("An mirr occurred in updateDoc:", updatepostListstitle);
      // await updateDoc(postRef, updatepostLists);
    } catch (error) {
      console.error("An error occurred in updateDoc:", error);
      // console.error("An error occurred in updateDoc:", updateData1);
    }

    navigate("/");
    // updatesetPostList({ title: "", postText: "" });
  };

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    id && getBlogDetail(id);
  }, [id]);

  const getBlogDetail = async (id) => {
    const querySnapshot = await getDocs(postsCollectionRef1);

    let documents = [];

    querySnapshot.forEach((doc) => {
      const docId = doc.id;
      const data = doc.data();
      documents.push({ id: docId, ...data }); // Append data to the documents array

      // Now you can use the documents array as needed, such as displaying it in the UI
      console.log("All documents:", documents);

      const document1 = documents.find((doc) => doc.id === id);

      updatesetPostListtitle(document1);
      updatesetPostListptext(document1);
      //console.log("All documents:2222", document1);
      // console.log("All documents:22221", document1.title);
    });
  };

  return (
    <div className="createPostPage">
      <div className="cpContainer">
        <h1> {id ? "Update Blog" : "Create Blog"}</h1>
        <div className="inputGp">
          <label> Title:</label>
          {id ? (
            <input
              type="text"
              placeholder="Title..."
              value={updatepostListstitle.title}
              onChange={(event) => {
                updatesetPostListtitle(event.target.value);
              }}
            />
          ) : (
            <input
              type="text"
              placeholder="Title..."
              onChange={(event) => {
                setTitle(event.target.value);
              }}
            />
          )}
        </div>
        <div className="inputGp">
          <label> Post:</label>
          {id ? (
            <textarea
              type="text"
              placeholder="Post..."
              value={updatepostListsptext.postText}
              onChange={(event) => {
                updatesetPostListptext(event.target.value);
              }}
            />
          ) : (
            <textarea
              type="text"
              placeholder="Post..."
              onChange={(event) => {
                setPostText(event.target.value);
              }}
            />
          )}
        </div>
        <div></div>
        {id ? (
          <button onClick={handleEdit}>Save Changes</button>
        ) : (
          <button onClick={createPost}>Create Blog</button>
        )}
      </div>
    </div>
  );
}

export default CreatePost;
