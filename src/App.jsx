import { useState } from 'react'
import Header from './components/Header'
import initialEmails from './data/emails'
import './styles/App.css'

function App() {
  const [emails, setEmails] = useState(initialEmails)
  const [emailsDisplay, setEmailsDisplay] = useState(initialEmails)
  const [activeMenu, setActiveMenu] = useState('Inbox')

  const getReadEmails = () => {
    const readEmails = emailsDisplay.filter((email) => email.read)
    console.log(readEmails);
    
    setEmailsDisplay(readEmails)
  }

  const showInbox = () => {
    setEmailsDisplay(emails)
    setActiveMenu('Inbox')
  }

  const getStarredEmails = () => {
    const starredEmails = emails.filter((email) => email.starred)
    setEmailsDisplay(starredEmails)
    setActiveMenu('Starred')
  }

  const toggleStar = (id) => {
    const updatedEmails = emails.map((email) => {
      if (email.id === id) {
        return { ...email, starred: !email.starred }
      }
      return email
    })
    setEmails(updatedEmails)
    if (activeMenu === 'Starred') {
      setEmailsDisplay(updatedEmails.filter((email) => email.starred))
    } else {
      setEmailsDisplay(updatedEmails)
    }
  }

  const toggleRead = (id) => {
    const updatedEmails = emails.map((email) => {
      if (email.id === id) {
        return { ...email, read: !email.read }
      }
      return email
    })
    setEmails(updatedEmails)
    if (activeMenu === 'Starred') {
      setEmailsDisplay(updatedEmails.filter((email) => email.starred))
    } else {
      setEmailsDisplay(updatedEmails)
    }
  }

  return (
    <div className="app">
      <Header />
      <nav className="left-menu">
        <ul className="inbox-list">
          <li
            className={`item ${activeMenu === 'Inbox' ? 'active' : ''}`}
            onClick={showInbox}
          >
            <span className="label">Inbox</span>
            <span className="count">{emails.length}</span>
          </li>
          <li
            className={`item ${activeMenu === 'Starred' ? 'active' : ''}`}
            onClick={getStarredEmails}
          >
            <span className="label">Starred</span>
            <span className="count">{emails.filter((email) => email.starred).length}</span>
          </li>

          <li className="item toggle">
            <label htmlFor="hide-read">Hide read</label>
            <input
              id="hide-read"
              type="checkbox"
              onChange={() => {getReadEmails()}}
            />
          </li>
        </ul>
      </nav>
      <main className="emails">
        <ul>
          {emailsDisplay.map((email) => (
            <li key={email.id} className={`email ${email.read ? 'read' : 'unread'}`}>
              <div className="select">
                <input
                  className="select-checkbox"
                  type="checkbox"
                  checked={email.read}
                  onChange={() => toggleRead(email.id)}
                />
              </div>
              <div className="star">
                <input
                  className="star-checkbox"
                  type="checkbox"
                  checked={email.starred}
                  onChange={() => toggleStar(email.id)}
                />
              </div>
              <div className="sender">{email.sender}</div>
              <div className="title">{email.title}</div>
            </li>
          ))}
        </ul>
      </main>
    </div>
  )
}

export default App
