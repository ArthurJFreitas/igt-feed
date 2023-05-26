import styles from './Sidebar.module.css';
import { PencilLine } from 'phosphor-react';
import { Avatar } from './Avatar';

interface SidebarProps {
	coverImageUrl: string;
	avatarImageUrl: string;
	name: string;
	role: string;
	editProfileUrl: string;
}

export function Sidebar({
	coverImageUrl,
	avatarImageUrl,
	name,
	role,
	editProfileUrl,
}: SidebarProps) {
	return (
		<aside className={styles.sidebar}>
			<img className={styles.cover} src={coverImageUrl} />
			<div className={styles.profile}>
				<Avatar src={avatarImageUrl} />
				<strong>{name}</strong>
				<span>{role}</span>
			</div>

			<footer>
				<a href={editProfileUrl}>
					<PencilLine size={20} />
					Edit profile
				</a>
			</footer>
		</aside>
	);
}
