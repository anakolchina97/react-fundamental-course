import React, {useState} from 'react';
import MyButton from './ui/button/MyButton';
import MyInput from './ui/input/MyInput';

const PostForm = ({create}) => {
  const [post, setPost] = useState({title: '', body: ''});

  const addNewPost = (e) => {
    e.preventDefault();

    const newPost = {
      ...post, id: Date.now(),
    };
    
    create(newPost);
    setPost({title: '', body: ''});
  };

  return (
    <form className="form">
      {/* Управляемый компонент */}
      <MyInput 
        type="text" 
        placeholder="Заголовок поста" 
        value={post.title} 
        onChange={e => setPost({...post, title: e.target.value})} 
      />

      <MyInput 
        type="text" 
        placeholder="Описание поста" 
        value={post.body} 
        onChange={e => setPost({...post, body: e.target.value})}
      />

      {/* Неуправляемый компонент */}
      {/* <MyInput ref={bodyInputRef} type="text" placeholder="Описание поста" /> */}
      <MyButton onClick={addNewPost}>Создать пост</MyButton>
    </form>
  );
};

export default PostForm;