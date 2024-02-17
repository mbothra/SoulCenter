import React from 'react';
import styles from './Footer.module.css';
import { useTranslation } from 'react-i18next';

export default function Footer() {
	const { t } = useTranslation();

	return (
		<footer className={styles.footer}>
			<p>
				<strong>
					<a className={styles.contact} href="mailto:varziclaudio@gmail.com">
					</a>
				</strong>{' '}
			</p>
		</footer>
	);
}
