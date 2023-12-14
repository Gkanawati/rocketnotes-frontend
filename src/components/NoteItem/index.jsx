import { useRef } from 'react';
import { FiPlus, FiX } from 'react-icons/fi';

import { Container } from './styles';

export function NoteItem({ isNew, value, onClick, ...rest }) {
  const inputRef = useRef(null);

  // useEffect(() => {
  //   if (isNew) {
  //     inputRef.current.focus();
  //   }
  // }, [onClick, isNew]);

  return (
    <Container isNew={isNew}>
      <input
        type="text"
        value={value}
        readOnly={!isNew}
        ref={inputRef}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            onClick();
          }
        }}
        {...rest}
      />

      <button
        type='button'
        onClick={onClick}
        className={isNew ? 'button-add' : 'button-delete'}
      >
        {isNew ? <FiPlus /> : <FiX />}
      </button>
    </Container>
  )
}