import styles from './HomeSection.module.css';
import SectionHeadline from '../../components/SectionHeadline/SectionHeadline';
import CtaButton from '../../components/CtaButton/CtaButton';
import headLineData from '../../data/headLineData.json';
import logo from '../../assets/img/lotus.svg';
import { useTranslation } from 'react-i18next';
import React, { useState } from 'react';

export default function HomeSection() {
	const { t } = useTranslation();
    const [feeling, setFeeling] = useState('');

	return (
		<main className={styles.main}>
			<div className={styles.home_container}>
				<SectionHeadline
					img={logo}
					title={headLineData.home.title}
					subtitle={t('homeSection.subtitle')}
				/>
				{/* <div className={styles.feelingInputContainer}>
                    <input
                        className={styles.feelingInput}
                        type="text"
                        placeholder={t('homeSection.feelingPlaceholder')}
                        value={feeling}
                        onChange={(e) => setFeeling(e.target.value)}
                    />
                </div>
                <div className={styles.miniInputsContainer}>
                    <input className={styles.miniInput} type="text" placeholder={t('homeSection.miniInputPlaceholder1')} />
                    <input className={styles.miniInput} type="text" placeholder={t('homeSection.miniInputPlaceholder2')} />
                    <input className={styles.miniInput} type="text" placeholder={t('homeSection.miniInputPlaceholder3')} />
                </div> */}
				<CtaButton />
			</div>
		</main>
	);
}
