import styles from "./Chat.module.css";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { autentication } from "../../src/features/auth/authSlice";
import { getMessages } from "../../src/features/chat/chatSlice";
import io from "socket.io-client";
import Layout from "../../layouts/Layout";
import { formatDate } from "../../src/utils/formatDate";
import EmojiPicker from "emoji-picker-react";
import { error } from "../../src/utils/toast";

const socket = io(`${process.env.NEXT_PUBLIC_URL_BACKEND}`);

const index = () => {
  const chat = useSelector((state) => state.chat.messages);
  const [message, setMessage] = useState("");
  const router = useRouter();
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [showPicker, setShowPicker] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_URL_BACKEND}/api/auth/user`, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.data?.error) {
          error(result.data?.error);
          router.push("/login");
          return;
        }
        if (result.isAdmin) {
          error("Admin not access");
          router.back();
          return;
        }
      });

    dispatch(autentication());
  }, []);

  useEffect(() => {
    dispatch(getMessages({ email: auth.user.email }));
    fetch(`${process.env.NEXT_PUBLIC_URL_BACKEND}/chat/checkClient`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        email: auth.user.email,
      }),
    }).catch((err) => {
      error(err);
      router.reload();
    });
  }, [auth]);

  useEffect(() => {
    socket.emit("user_connected", auth.user.email);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView();
  }, [chat]);

  const onHandleSubmit = (e) => {
    e.preventDefault();
    socket.emit("send_message", {
      sender: auth.user.email,
      receiver: "nicolas1819991@gmail.com",
      type: "usuario",
      message,
    });
    dispatch(getMessages({ email: auth.user.email }));
    setMessage("");
  };

  useEffect(() => {
    const eventListener = () => {
      dispatch(getMessages({ email: auth.user.email }));
    };
    socket.on("new_message", eventListener);

    return () => socket.off("new_message", eventListener);
  }, [socket]);

  const onEmojiClick = (emojiObject) => {
    setMessage((prevInput) => prevInput + emojiObject.emoji);
    setShowPicker(false);
  };

  return (
    <>
      {auth.auth && (
        <Layout auth={auth}>
          <div className={`${styles.chatLayout} container position-relative`}>
            <div className="d-flex align-items-center p-3">
              <img src={"/shopping-bag.png"} className={`${styles.imgUser}`} />
              <span className="ms-3 fw-bold">System</span>
            </div>
            <div
              className={`${styles.bodyChat} w-100 d-flex flex-column position-relative overflow-auto`}
            >
              {chat.map((item) => (
                <div
                  className={`${
                    item.type == "usuario"
                      ? styles.msgContainerClient
                      : styles.msgContainerSystem
                  } d-flex flex-column position-relative`}
                  key={item._id}
                >
                  <span className="fw-semibold mb-1">
                    {item.type == "usuario" ? "You" : "System"}
                  </span>
                  <span>{item.body}</span>
                  <span className={`${styles.hourmsg}`}>
                    {formatDate(new Date(item.datetime))}
                  </span>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {showPicker && (
              <div className={`${styles.btnEmotions} position-absolute`}>
                <EmojiPicker onEmojiClick={onEmojiClick} />
              </div>
            )}

            <form className="d-flex mt-3" onSubmit={onHandleSubmit}>
              <div class={`${styles.pickerContainer} input-group mb-3`}>
                <span
                  className={`${styles.emojiIcon} input-group-text`}
                  onClick={() => setShowPicker(!showPicker)}
                >
                  <i class="bi bi-emoji-smile"></i>
                </span>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter a message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <button
                  type="submit"
                  class="input-group-text btn btn-primary"
                  disabled={message == ""}
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </Layout>
      )}
    </>
  );
};

export default index;
