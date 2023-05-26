import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';

import { Post, PostType } from './components/Post';
import './global.css';
import styles from './App.module.css';

const posts: PostType[] = [
  {
    id: 1,
    author: {
      avatarUrl: 'https://github.com/arthurjfreitas.png',
      name: 'Arthur Freitas',
      role: 'Senior Software Engineer 🧙‍♀️ | Frontend',
    },
    content: [
      { type: 'paragraph', content: 'Hello everyone 😁' },
      {
        type: 'paragraph',
        content: 'Just uploaded a new project to my portfolio.',
      },
      { type: 'link', content: 'arthurjfreitas/igt-feed' },
    ],
    publishedAt: new Date('2023-05-24 19:43:00'),
  },
  {
    id: 2,
    author: {
      avatarUrl: 'https://github.com/arthurjfreitas.png',
      name: 'Arthur Freitas',
      role: 'Senior Software Engineer 🧙‍♀️ | Frontend',
    },
    content: [
      { type: 'paragraph', content: 'Hello everyone 🚀' },
      {
        type: 'paragraph',
        content: 'Just uploaded a new project to my portfolio.',
      },
      { type: 'link', content: 'arthurjfreitas/igt-feed' },
    ],
    publishedAt: new Date('2023-05-23 19:45:00'),
  },
];

export function App() {
  return (
    <div>
      <Header />
      <div className={styles.wrapper}>
        <Sidebar
          coverImageUrl="https://images.unsplash.com/photo-1587170194491-ce8e824631d6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=50"
          avatarImageUrl="https://github.com/arthurjfreitas.png"
          name="Arthur Freitas"
          role="Frontend"
          editProfileUrl="#"
        />
        <main>
          {posts.map(post => {
            return <Post key={post.id} post={post} />;
          })}
        </main>
      </div>
    </div>
  );
}
