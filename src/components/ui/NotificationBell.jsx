import { useState, useEffect } from 'react';
import { FaUserCircle } from "react-icons/fa";
import { socket } from '../../apiClients/socket';

export const NotificationBell = () => {
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [notificationBell, setNotificationBell] = useState("");

  useEffect(() => {
    // Listen for new deal notifications
    socket.on("newDealNotification", ({ message }) => {
      setNotificationBell(message);

      // Hide notification after 3 seconds
      setTimeout(() => setNotificationBell(""), 3000);
    });

    return () => {
      socket.off("newDealNotification");
    };
  }, []);

  // Mark a notification as read
  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="p-1 rounded-full text-gray-500 hover:text-gray-700 focus:outline-none"
      >
        <div className="relative">
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
          {notifications.filter((n) => !n.read).length > 0 && (
            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
          )}
        </div>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-white rounded-md shadow-lg overflow-hidden z-20">
          <div className="py-1">
            <div className="px-4 py-2 border-b">
              <h3 className="text-sm font-medium text-gray-700">Notifications</h3>
            </div>
            {notifications.length === 0 && !notificationBell ? (
              <div className="px-4 py-3 text-sm text-gray-500">
                No new notifications
              </div>
            ) : (
              <div className="max-h-60 overflow-y-auto">
                {notificationBell && (
                  <div className="px-4 py-3 text-sm bg-blue-50 hover:bg-gray-100">
                    <p className="font-medium text-gray-900">{notificationBell}</p>
                  </div>
                )}
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    onClick={() => markAsRead(notification.id)}
                    className={`px-4 py-3 text-sm cursor-pointer ${!notification.read ? 'bg-blue-50' : 'bg-white'} hover:bg-gray-100`}
                  >
                    <p className="font-medium text-gray-900">{notification.title}</p>
                    <p className="text-gray-500">{notification.message}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(notification.timestamp).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
