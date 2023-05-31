import { useEffect } from "react";

const Popup = ({ isOpen, name, onClose, children }) => {

  useEffect(() => {
    if (!isOpen) return;
      const closeByEscape = (e) => {
    if (e.key === 'Escape') {
    onClose();
   }
  }
  document.addEventListener('keydown', closeByEscape)
  return () => document.removeEventListener('keydown', closeByEscape)
}, [isOpen, onClose])

 const handleOverlay = (e) => {
  if (e.target === e.currentTarget) {
    onClose();
  }
 }

 return (
  <section className={`popup ${isOpen  ? "popup_opened" : ""}`}
   onClick={handleOverlay}
  >
   <div className={`popup__container popup__container_${name}`}>
    {children}
    <button
     className='popup__close'
     type='button'
     onClick={onClose}
    />
   </div>
  </section>
 );
};

export default Popup;

