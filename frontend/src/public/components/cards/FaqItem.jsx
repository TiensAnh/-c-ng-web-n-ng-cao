function FaqItem({ answer, isOpen, onToggle, question }) {
  return (
    <article className={`faq-item${isOpen ? ' faq-item--open' : ''}`}>
      <button className="faq-item__button" type="button" onClick={onToggle}>
        <span>{question}</span>
        <span className="material-symbols-outlined">{isOpen ? 'remove' : 'add'}</span>
      </button>
      {isOpen ? <p className="faq-item__answer">{answer}</p> : null}
    </article>
  );
}

export default FaqItem;
