import { format, formatDistanceToNow } from 'date-fns';
import enUS from 'date-fns/locale/en-US';
import { ChangeEvent, FormEvent, useState } from 'react';
import { Avatar } from './Avatar';
import { Comment } from './Comment';
import styles from './Post.module.css';

interface Author {
  name: string;
  role: string;
  avatarUrl: string;
}

interface Content {
  type: string;
  content: string;
}

export interface PostType {
  id: number;
  author: Author;
  publishedAt: Date;
  content: Content[];
}

interface PostProps {
  post: PostType;
}

export function Post({ post }: PostProps) {
  const { author, publishedAt, content } = post;

  const [commentsMock, setCommentsMock] = useState([
    'Great post, congrats! 🔥 🚀',
  ]);

  const [newCommentText, setNewCommentText] = useState('');

  const publishedDateFormatted = format(
    publishedAt,
    "'on' MMMM do 'at' h:mm a",
    {
      locale: enUS,
    },
  );

  const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
    locale: enUS,
    addSuffix: true,
  });

  function handleCreateNewComment(event: FormEvent) {
    event.preventDefault();
    setCommentsMock([...commentsMock, newCommentText]);
    setNewCommentText('');
  }

  function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity(``);
    setNewCommentText(event.target.value);
  }

  function deleteComment(commentToDelete: string) {
    const commentsWithoutDeletedOne = commentsMock.filter(comment => {
      return comment !== commentToDelete;
    });

    setCommentsMock(commentsWithoutDeletedOne);
  }

  const isNewCommentEmpty = newCommentText.length === 0;
  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={author.avatarUrl} />
          <div className={styles.authorInfo}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>

        <time
          title={publishedDateFormatted}
          dateTime={publishedAt.toISOString()}
        >
          {publishedDateRelativeToNow}
        </time>
      </header>
      <div className={styles.content}>
        {content.map(contentItem => {
          if (contentItem.type === 'paragraph') {
            return <p key={contentItem.content}>{contentItem.content}</p>;
          } else if (contentItem.type === 'link') {
            return (
              <p key={contentItem.content}>
                <a href="#">{contentItem.content}</a>
              </p>
            );
          }
        })}
      </div>

      <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
        <strong>Leave your feedback</strong>
        <textarea
          name="comment"
          placeholder="Leave a comment"
          value={newCommentText}
          onChange={handleNewCommentChange}
          required
        />

        <footer>
          <button type="submit" disabled={isNewCommentEmpty}>
            Post
          </button>
        </footer>
      </form>

      <div className={styles.commentList}>
        {commentsMock.map(comment => {
          return (
            <Comment
              key={comment}
              content={comment}
              onDeleteComment={deleteComment}
              createdAt={new Date(2023, 5, 11)}
            />
          );
        })}
      </div>
    </article>
  );
}
