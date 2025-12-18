import styles from './sales-contact.module.css';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import imageUrl from '../../assets/maciej-teska-workflow.jpg';
import clsx from 'clsx';
import { LinkedinLogo, PaperPlaneRight } from '@phosphor-icons/react';

const salesDetails = {
  name: 'Maciej Teska',
  imageUrl,
  position: 'CEO',
  email: 'maciej.teska@workflowbuilder.io',
  linkedInUrl: 'https://linkedin.com/in/maciej-teska',
};

export function SalesContact() {
  const { name, position, imageUrl, email, linkedInUrl } = salesDetails;
  const initials = name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');

  function handleLinkedInClick() {
    window.open(`${linkedInUrl}`, '_blank');
  }

  function handleEmailClick() {
    globalThis.location.href = `mailto:${email}`;
  }

  return (
    <div className={styles['container']}>
      <div className={styles['details-container']}>
        <Avatar>
          <AvatarImage src={imageUrl} alt={name} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <div className={styles['details']}>
          <span className="ax-public-h10">{name}</span>
          <span className={clsx('ax-public-p11', styles['position'])}>{position}</span>
        </div>
      </div>
      <div className={styles['buttons']}>
        <Button variant="secondary" onClick={handleLinkedInClick}>
          <LinkedinLogo />
          LinkedIn
        </Button>
        <Button variant="secondary" onClick={handleEmailClick}>
          <PaperPlaneRight />
          Email
        </Button>
      </div>
    </div>
  );
}
