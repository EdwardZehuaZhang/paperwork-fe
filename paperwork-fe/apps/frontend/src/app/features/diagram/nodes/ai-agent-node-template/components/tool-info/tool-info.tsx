import styles from './tool-info.module.css';

import { PropsWithChildren } from 'react';
import { NodeInfoWrapper } from '../node-info-wrapper/node-wrapper-info';
import { PlaceholderButton } from '../../../components/placeholder-button/placeholder-button';

export function ToolInfo({ children }: PropsWithChildren) {
  return (
    <NodeInfoWrapper label={'AI Agent Tools'}>
      <div className={styles['tools-container']}>{children}</div>
      <div className={styles['icon-container']}>
        <PlaceholderButton label="Add Tool" />
      </div>
    </NodeInfoWrapper>
  );
}
