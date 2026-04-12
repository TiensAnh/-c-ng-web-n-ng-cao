import { useEffect, useId, useState } from "react";
import { cn } from "../utils/formatters";
import "../styles/admin-modal.css";
import Button from "./Button";
import Icon from "./Icon";

function getOptionValue(option) {
  return typeof option === "string" ? option : option.value;
}

function getOptionLabel(option) {
  return typeof option === "string" ? option : option.label;
}

function buildInitialValues(fields, initialValues = {}) {
  return fields.reduce((accumulator, field) => {
    const defaultValue = initialValues[field.name];
    const firstOption = field.options?.[0];

    accumulator[field.name] =
      defaultValue ??
      (field.type === "select" && firstOption ? getOptionValue(firstOption) : "");

    return accumulator;
  }, {});
}

export default function AdminActionModal({
  isOpen,
  title,
  description,
  eyebrow = "Quick action",
  icon = "add_circle",
  features = [],
  fields = [],
  initialValues = {},
  note = "",
  submitLabel = "Save",
  cancelLabel = "Cancel",
  onClose,
  onSubmit,
}) {
  const [values, setValues] = useState(() => buildInitialValues(fields, initialValues));
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    setValues(buildInitialValues(fields, initialValues));
    return undefined;
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose?.();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  const handleChange = (name) => (event) => {
    setValues((currentValues) => ({
      ...currentValues,
      [name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const shouldClose = onSubmit?.(values);

    if (shouldClose !== false) {
      onClose?.();
    }
  };

  const renderField = (field) => {
    const commonProps = {
      autoComplete: field.autoComplete,
      name: field.name,
      onChange: handleChange(field.name),
      placeholder: field.placeholder,
      required: field.required,
      value: values[field.name] ?? "",
    };

    let control = (
      <input
        {...commonProps}
        className="admin-modal__control"
        min={field.min}
        step={field.step}
        type={field.type ?? "text"}
      />
    );

    if (field.type === "textarea") {
      control = <textarea {...commonProps} className="admin-modal__control admin-modal__control--textarea" rows={field.rows ?? 4} />;
    }

    if (field.type === "select") {
      control = (
        <div className="admin-modal__select-wrap">
          <select {...commonProps} className="admin-modal__control admin-modal__control--select">
            {field.options?.map((option) => (
              <option key={getOptionValue(option)} value={getOptionValue(option)}>
                {getOptionLabel(option)}
              </option>
            ))}
          </select>
          <Icon name="expand_more" className="admin-modal__select-icon" />
        </div>
      );
    }

    return (
      <label
        key={field.name}
        className={cn("admin-modal__field", field.span === 2 && "admin-modal__field--full")}
      >
        <span className="admin-modal__label">{field.label}</span>
        {control}
        {field.hint ? <span className="admin-modal__hint">{field.hint}</span> : null}
      </label>
    );
  };

  return (
    <div className="admin-modal">
      <button
        aria-label="Dong popup"
        className="admin-modal__backdrop"
        type="button"
        onClick={onClose}
      />

      <div
        aria-describedby={descriptionId}
        aria-labelledby={titleId}
        aria-modal="true"
        className="admin-modal__dialog"
        role="dialog"
      >
        <aside className="admin-modal__aside">
          <div className="admin-modal__hero-icon">
            <Icon name={icon} />
          </div>
          <p className="admin-modal__eyebrow">{eyebrow}</p>
          <h2 className="admin-modal__title" id={titleId}>
            {title}
          </h2>
          <p className="admin-modal__description" id={descriptionId}>
            {description}
          </p>

          {features.length ? (
            <div className="admin-modal__feature-list">
              {features.map((feature) => (
                <article key={feature.title} className="admin-modal__feature-card">
                  <div className="admin-modal__feature-icon">
                    <Icon name={feature.icon} />
                  </div>
                  <div>
                    <h3 className="admin-modal__feature-title">{feature.title}</h3>
                    <p className="admin-modal__feature-description">{feature.description}</p>
                  </div>
                </article>
              ))}
            </div>
          ) : null}
        </aside>

        <section className="admin-modal__panel">
          <div className="admin-modal__panel-header">
            <div>
              <p className="admin-modal__panel-title">Cap nhat du lieu ngay trong bang quan tri</p>
              <p className="admin-modal__panel-subtitle">
                Dien cac truong can thiet roi bam luu de tao moi nhanh.
              </p>
            </div>
            <button
              aria-label="Dong popup"
              className="admin-modal__close"
              type="button"
              onClick={onClose}
            >
              <Icon name="close" />
            </button>
          </div>

          {note ? (
            <div className="admin-modal__note">
              <Icon name="tips_and_updates" className="admin-modal__note-icon" />
              <p>{note}</p>
            </div>
          ) : null}

          <form className="admin-modal__form" onSubmit={handleSubmit}>
            <div className="admin-modal__grid">{fields.map(renderField)}</div>

            <div className="admin-modal__actions">
              <Button variant="secondary" type="button" onClick={onClose}>
                {cancelLabel}
              </Button>
              <Button icon="check" type="submit">
                {submitLabel}
              </Button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}
