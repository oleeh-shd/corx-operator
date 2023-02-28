import React, {FC} from 'react';
import cn from 'classnames';

import styles from './toggle.module.scss';

type ToggleProps = {
    isOpened: boolean;
    onToggle: (e: React.MouseEvent<HTMLDivElement>) => void;
}
const Toggle: FC<ToggleProps>= ({ isOpened, onToggle}) => {


    return (
        <div className={cn(styles.toggleContainer, isOpened ? styles.isOpen : undefined)} onClick={(e) => onToggle(e)}>
            <div className={styles.thumb} />
        </div>
    );
};

export default Toggle;
