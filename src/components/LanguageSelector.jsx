import { X } from 'lucide-react';
import { useLanguage, LANGUAGES } from '../context/LanguageContext';
import './LanguageSelector.css';

const LanguageSelector = ({ isOpen, onClose }) => {
  const { lang: currentLang, setLang } = useLanguage();

  if (!isOpen) return null;

  return (
    <div className="language-modal-overlay" onClick={onClose}>
      <div className="language-modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Select Language</h3>
          <button className="close-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>
        <div className="language-list">
          {LANGUAGES.map((lang) => (
            <button 
              key={lang.id} 
              className={`language-item ${currentLang === lang.id ? 'active' : ''}`}
              onClick={() => {
                setLang(lang.id);
                onClose();
              }}
            >
              <div className="lang-flag-circle">
                <span className="code-text">{lang.code}</span>
              </div>
              <div className="lang-info-main">
                <span className="lang-name">{lang.name}</span>
                <span className="lang-native">{lang.flag}</span>
              </div>
              {currentLang === lang.id && (
                <div className="check-mark">
                  <div className="check-inner" />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LanguageSelector;
