import { Avatar } from './Avatar';
import styles from './Comment.module.css';
import { Trash, ThumbsUp } from 'phosphor-react';
import { useState } from 'react';
import { format, formatDistanceToNow } from 'date-fns';
import enUS from 'date-fns/locale/en-US';

interface CommentProps {
	content: string;
	onDeleteComment: (comment: string) => void;
	createdAt: Date;
}

export function Comment({ content, onDeleteComment, createdAt }: CommentProps) {
	const [likeCount, setLikeCount] = useState(0);

	function handleDeleteComment() {
		onDeleteComment(content);
	}

	function handleLikeComment() {
		setLikeCount((state) => {
			return state + 1;
		});
	}

	const commentDateFormatted = format(createdAt, "'on' MMMM do 'at' h:mm a", {
		locale: enUS,
	});

	const commentDateRelativeToNow = formatDistanceToNow(createdAt, {
		locale: enUS,
		addSuffix: true,
	});

	return (
		<div className={styles.comment}>
			<Avatar
				hasBorder={false}
				src="https://github.com/arthurjfreitas.png"
				alt="Avatar"
			/>
			<div className={styles.commentBox}>
				<div className={styles.commentContent}>
					<header>
						<div className={styles.authorAndTime}>
							<strong>Arthur Fretias</strong>
							<time
								title={commentDateFormatted}
								dateTime={createdAt.toISOString()}
							>
								{commentDateRelativeToNow}
							</time>
						</div>
						<button onClick={handleDeleteComment} title="Delete comment">
							<Trash size={24} />
						</button>
					</header>
					<p>{content}</p>
				</div>
				<footer>
					<button onClick={handleLikeComment}>
						<ThumbsUp />
						Like <span>{likeCount}</span>
					</button>
				</footer>
			</div>
		</div>
	);
}
