import React, { ChangeEvent, FC } from 'react';

import cn from 'classnames';
import styles from './input.module.scss'
import errorIcon from '../../../../assets/error.svg';
import checked from '../../../../assets/checked.svg';
import view from '../../../../assets/view.png';
import hide from '../../../../assets/hide.svg';

type InputProps = {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  type?: 'text' | 'password';
  onIconClick?: () => void;
  showPassword?: boolean;
  error?: boolean | string;
  access?: boolean;
}
const Input: FC<InputProps> = ({
           value,
           onChange,
           type = 'text',
           placeholder,
           error,
           access,
           showPassword,
           onIconClick
       }) => {

  const checkType = (type: string) => {
    return type === 'password' ? (showPassword ? 'text' : 'password') : type;
  }

  return (
    <div className={styles.inputWrapper}>
      <input
        className={cn(styles.input, error && styles.error, !error && access && styles.access)}
        type={checkType(type)}
        value={value}
        onChange={(e) => onChange(e)}
        placeholder={placeholder}
      />
      {error && <img className={styles.inputIconStatus} src={errorIcon} alt="error"/>}
      {!error && access && <img className={styles.inputIconStatus} src={checked} alt="checked"/>}
      {typeof error === 'string' && error?.length === 0 &&
				<>{type === 'password' &&
					<img
						className={styles.inputIcon}
						src={(showPassword ? view : hide)}
						onClick={onIconClick}
						alt={showPassword ? 'show' : hide}
					/>
        }</>
      }
    </div>
  );
};

export default Input;
