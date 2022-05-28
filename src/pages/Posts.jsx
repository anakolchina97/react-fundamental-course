import React, { useState, useRef, useMemo, useEffect } from 'react';
import Counter from '../components/Counter';
import ClassCounter from '../components/ClassCounter';
import '../styles/App.css';
import PostList from '../components/PostList';
import PostForm from '../components/PostForm';
import PostFilter from '../components/PostFilter';
import MyModal from '../components/ui/modal/MyModal';
import MyButton from '../components/ui/button/MyButton';
import { usePosts } from '../hooks/usePosts';
import axios from 'axios';
import PostService from '../api/PostService';
import Loader from '../components/ui/loader/Loader';
import { useFetching } from '../hooks/useFetching';
import { getPageCount, getPagesArray } from '../utils/pages';
import MyPagination from '../components/ui/pagination/MyPagination';
import { useObserver } from '../hooks/useObserver';
import MySelect from '../components/ui/select/MySelect';

function Posts() {
  const [value, setValue] = useState('Title');
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({sort: '', query: ''});
  const [modal, setModal] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
  const lastElement = useRef();

  const [fetchPosts, isPostsLoading, postError] = useFetching(async (limit, page) => {
    const response = await PostService.getAll(limit, page);
    setPosts([...posts, ...response.data]);

    const totalCount = response.headers['x-total-count'];
    setTotalPages(getPageCount(totalCount, limit));
  });

  useObserver(lastElement, page < totalPages, isPostsLoading, () => {
    setPage(page + 1);
  });

  useEffect(() => {
    fetchPosts(limit, page);
  }, [page, limit]);

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false);
  };

  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id))
  };

  const changePage = (page) => {
    setPage(page);
  };
  
  return (
    <div className="App">
      <button onClick={fetchPosts}>GET</button>
      <MyButton style={{marginTop: '60px'}} onClick={() => setModal(true)}>
        Создать пользователя
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>
      <h1>{ value }</h1>
      <input onChange={(e) => setValue(e.target.value)} />
      <Counter />
      <Counter />
      <ClassCounter />
      <hr style={{margin: "15px 0px"}} />
      
      <PostFilter filter={filter} setFilter={setFilter} />

      <MySelect value={limit} onChange={(value) => setLimit(value)} defaultValue="Количество элементов на странице" options={[
        {value: 5, name: '5'},
        {value: 10, name: '10'},
        {value: 25, name: '25'},
        {value: -1, name: 'Получить все посты'},
      ]} />

      {
        postError
        ? <h1>Произошла ошибка ${postError}</h1>
        : 'Все ок'
      }

      {isPostsLoading &&
        <div style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}><Loader /></div> 
      }

      <PostList remove={removePost} posts={sortedAndSearchedPosts} title="Посты про JS" />
      <div ref={lastElement} style={{height: '20px', background: 'red'}}></div>
      <MyPagination page={page}  changePage={changePage} totalPages={totalPages} />
      {/* <PostList posts={posts2} title="Посты про Python" /> */}
    </div>
  );
}

export default Posts;
