import React, { useState } from 'react';
import { Phone, MapPin, Globe, Building, Search, Plus, Trash2, Copy, CheckCircle, Clock, MessageSquare, AlertCircle, TrendingUp, Activity } from 'lucide-react';

export default function PhoneTrackerComplete() {
  const [trackedNumbers, setTrackedNumbers] = useState([
    {
      id: 1,
      number: '+91-9876543210',
      name: 'John Doe',
      provider: 'Jio',
      location: 'Delhi, India',
      country: 'India',
      type: 'Mobile',
      network: '4G',
      areaCode: '+91-98',
      dateAdded: '2025-10-10',
      notes: 'Client contact',
      lastSeen: '2025-10-14 3:45 PM',
      calls: 8,
      messages: 5,
      blocked: false,
      trusted: true,
      callLogs: [
        { date: '2025-10-14', time: '3:45 PM', duration: '5 min 32 sec', type: 'incoming' },
        { date: '2025-10-13', time: '2:15 PM', duration: '2 min 10 sec', type: 'outgoing' }
      ]
    },
    {
      id: 2,
      number: '+91-8765432109',
      name: 'Jane Smith',
      provider: 'Airtel',
      location: 'Mumbai, India',
      country: 'India',
      type: 'Mobile',
      network: '4G',
      areaCode: '+91-87',
      dateAdded: '2025-10-12',
      notes: 'Business partner',
      lastSeen: '2025-10-14 1:20 PM',
      calls: 12,
      messages: 8,
      blocked: false,
      trusted: true,
      callLogs: [
        { date: '2025-10-14', time: '1:20 PM', duration: '8 min 45 sec', type: 'incoming' },
        { date: '2025-10-12', time: '11:00 AM', duration: '3 min 20 sec', type: 'outgoing' }
      ]
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTab, setSelectedTab] = useState('overview');
  const [expandedId, setExpandedId] = useState(null);
  const [copied, setCopied] = useState(null);

  const [newEntry, setNewEntry] = useState({
    number: '',
    name: '',
    provider: 'Jio',
    location: '',
    country: 'India',
    type: 'Mobile',
    network: '4G',
    notes: '',
    trusted: false,
    blocked: false
  });

  const addNumber = () => {
    if (newEntry.number.trim() && newEntry.name.trim()) {
      const areaCode = newEntry.number.substring(0, 6);
      const entry = {
        id: Date.now(),
        ...newEntry,
        areaCode,
        dateAdded: new Date().toISOString().split('T')[0],
        lastSeen: new Date().toLocaleString(),
        calls: 0,
        messages: 0,
        callLogs: []
      };
      setTrackedNumbers([...trackedNumbers, entry]);
      setNewEntry({
        number: '',
        name: '',
        provider: 'Jio',
        location: '',
        country: 'India',
        type: 'Mobile',
        network: '4G',
        notes: '',
        trusted: false,
        blocked: false
      });
      setShowForm(false);
    }
  };

  const deleteNumber = (id) => {
    setTrackedNumbers(trackedNumbers.filter(item => item.id !== id));
  };

  const toggleBlocked = (id) => {
    setTrackedNumbers(trackedNumbers.map(item =>
      item.id === id ? { ...item, blocked: !item.blocked } : item
    ));
  };

  const toggleTrusted = (id) => {
    setTrackedNumbers(trackedNumbers.map(item =>
      item.id === id ? { ...item, trusted: !item.trusted } : item
    ));
  };

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const getLocationInfo = (areaCode) => {
    const locationMap = {
      '+91-98': 'North India',
      '+91-87': 'West India',
      '+91-94': 'South India',
      '+91-99': 'East India'
    };
    return locationMap[areaCode] || 'India';
  };

  const filteredNumbers = trackedNumbers.filter(item =>
    item.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const providers = ['Jio', 'Airtel', 'Vodafone', 'BSNL', 'VI', 'Other'];
  const types = ['Mobile', 'Landline', 'Business'];
  const networks = ['2G', '3G', '4G', '5G', 'Unknown'];

  // Stats
  const totalNumbers = trackedNumbers.length;
  const totalCalls = trackedNumbers.reduce((sum, item) => sum + item.calls, 0);
  const totalMessages = trackedNumbers.reduce((sum, item) => sum + item.messages, 0);
  const blockedCount = trackedNumbers.filter(item => item.blocked).length;
  const trustedCount = trackedNumbers.filter(item => item.trusted).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 flex items-center justify-center gap-3">
            <Phone className="w-10 h-10 md:w-12 md:h-12 text-blue-400" /> Phone Tracker Pro
          </h1>
          <p className="text-blue-300 text-base md:text-lg">Complete phone tracking and call management system</p>
        </div>

        {/* Stats Dashboard */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4 mb-8">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-4 text-white shadow-lg">
            <p className="text-xs md:text-sm opacity-90">Total Tracked</p>
            <p className="text-2xl md:text-4xl font-bold">{totalNumbers}</p>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-4 text-white shadow-lg">
            <p className="text-xs md:text-sm opacity-90">Total Calls</p>
            <p className="text-2xl md:text-4xl font-bold">{totalCalls}</p>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-4 text-white shadow-lg">
            <p className="text-xs md:text-sm opacity-90">Messages</p>
            <p className="text-2xl md:text-4xl font-bold">{totalMessages}</p>
          </div>
          <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-lg p-4 text-white shadow-lg">
            <p className="text-xs md:text-sm opacity-90">Blocked</p>
            <p className="text-2xl md:text-4xl font-bold">{blockedCount}</p>
          </div>
          <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg p-4 text-white shadow-lg">
            <p className="text-xs md:text-sm opacity-90">Trusted</p>
            <p className="text-2xl md:text-4xl font-bold">{trustedCount}</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6 relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search phone number, name, or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none transition text-sm md:text-base"
          />
        </div>

        {/* Tabs */}
        <div className="flex gap-2 md:gap-4 mb-6 flex-wrap">
          <button
            onClick={() => setSelectedTab('overview')}
            className={`px-3 md:px-4 py-2 rounded-lg font-semibold transition text-sm md:text-base ${selectedTab === 'overview' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
          >
            Overview
          </button>
          <button
            onClick={() => setSelectedTab('calls')}
            className={`px-3 md:px-4 py-2 rounded-lg font-semibold transition text-sm md:text-base ${selectedTab === 'calls' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
          >
            Call Logs
          </button>
          <button
            onClick={() => setSelectedTab('blocked')}
            className={`px-3 md:px-4 py-2 rounded-lg font-semibold transition text-sm md:text-base ${selectedTab === 'blocked' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
          >
            Blocked
          </button>
        </div>

        {/* Add Number Button */}
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="w-full mb-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-bold text-base md:text-lg hover:shadow-lg transform hover:scale-105 transition flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5" /> Add Phone Number
          </button>
        )}

        {/* Add Number Form */}
        {showForm && (
          <div className="bg-gray-800 rounded-lg p-4 md:p-6 mb-6 border border-blue-500">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-4">Add New Phone Number</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-4">
              <input
                type="tel"
                placeholder="Phone (+91-9876543210)"
                value={newEntry.number}
                onChange={(e) => setNewEntry({ ...newEntry, number: e.target.value })}
                className="p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
              <input
                type="text"
                placeholder="Name"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
                className="p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
              <select
                value={newEntry.provider}
                onChange={(e) => setNewEntry({ ...newEntry, provider: e.target.value })}
                className="p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              >
                {providers.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
              <select
                value={newEntry.network}
                onChange={(e) => setNewEntry({ ...newEntry, network: e.target.value })}
                className="p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              >
                {networks.map(n => <option key={n} value={n}>{n}</option>)}
              </select>
              <select
                value={newEntry.type}
                onChange={(e) => setNewEntry({ ...newEntry, type: e.target.value })}
                className="p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              >
                {types.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
              <input
                type="text"
                placeholder="Location"
                value={newEntry.location}
                onChange={(e) => setNewEntry({ ...newEntry, location: e.target.value })}
                className="p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>
            <textarea
              placeholder="Notes (optional)"
              value={newEntry.notes}
              onChange={(e) => setNewEntry({ ...newEntry, notes: e.target.value })}
              className="w-full p-3 rounded-lg mb-4 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              rows="2"
            />
            <div className="flex gap-2 mb-4">
              <label className="flex items-center gap-2 text-white cursor-pointer">
                <input
                  type="checkbox"
                  checked={newEntry.trusted}
                  onChange={(e) => setNewEntry({ ...newEntry, trusted: e.target.checked })}
                />
                Mark as Trusted
              </label>
              <label className="flex items-center gap-2 text-white cursor-pointer">
                <input
                  type="checkbox"
                  checked={newEntry.blocked}
                  onChange={(e) => setNewEntry({ ...newEntry, blocked: e.target.checked })}
                />
                Block this number
              </label>
            </div>
            <div className="flex gap-3">
              <button
                onClick={addNumber}
                className="flex-1 bg-blue-500 text-white py-2 rounded-lg font-bold hover:bg-blue-600 transition text-sm"
              >
                Save Number
              </button>
              <button
                onClick={() => setShowForm(false)}
                className="flex-1 bg-gray-700 text-white py-2 rounded-lg font-bold hover:bg-gray-600 transition text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Content Based on Tab */}
        <div className="space-y-4">
          {selectedTab === 'overview' && filteredNumbers.length > 0 && (
            filteredNumbers.map(entry => (
              <div
                key={entry.id}
                className={`bg-gray-800 rounded-lg border transition shadow-lg cursor-pointer ${
                  entry.blocked ? 'border-red-500 bg-gray-850' : 'border-gray-700 hover:border-blue-500'
                }`}
              >
                <div
                  onClick={() => setExpandedId(expandedId === entry.id ? null : entry.id)}
                  className="p-4 md:p-6"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-grow">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg md:text-xl font-bold text-white">{entry.name}</h3>
                        {entry.trusted && <span className="text-yellow-400 text-sm">⭐ Trusted</span>}
                        {entry.blocked && <span className="text-red-400 text-sm">🚫 Blocked</span>}
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <Phone className="w-4 h-4 text-blue-400" />
                        <p className="text-gray-300 font-mono text-sm md:text-base">{entry.number}</p>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            copyToClipboard(entry.number, entry.id);
                          }}
                          className="text-gray-400 hover:text-blue-400 transition"
                        >
                          {copied === entry.id ? <CheckCircle className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteNumber(entry.id);
                      }}
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition text-sm font-semibold"
                    >
                      Delete
                    </button>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 mb-3">
                    <div className="bg-gray-700 rounded p-2">
                      <p className="text-xs text-gray-400">Provider</p>
                      <p className="text-white font-semibold text-sm">{entry.provider}</p>
                    </div>
                    <div className="bg-gray-700 rounded p-2">
                      <p className="text-xs text-gray-400">Network</p>
                      <p className="text-white font-semibold text-sm">{entry.network}</p>
                    </div>
                    <div className="bg-gray-700 rounded p-2">
                      <p className="text-xs text-gray-400">Type</p>
                      <p className="text-white font-semibold text-sm">{entry.type}</p>
                    </div>
                    <div className="bg-gray-700 rounded p-2">
                      <p className="text-xs text-gray-400">Location</p>
                      <p className="text-white font-semibold text-sm">{entry.location}</p>
                    </div>
                  </div>

                  <div className="flex gap-2 md:gap-4 text-sm">
                    <span className="text-gray-400">📞 Calls: <span className="text-white font-bold">{entry.calls}</span></span>
                    <span className="text-gray-400">💬 Messages: <span className="text-white font-bold">{entry.messages}</span></span>
                    <span className="text-gray-400">🕐 Last: <span className="text-white font-bold">{entry.lastSeen}</span></span>
                  </div>
                </div>

                {/* Expanded Details */}
                {expandedId === entry.id && (
                  <div className="border-t border-gray-700 p-4 md:p-6 bg-gray-850">
                    {entry.notes && (
                      <div className="mb-4 p-3 bg-gray-700 rounded">
                        <p className="text-xs text-gray-400 mb-1">📝 Notes</p>
                        <p className="text-gray-300 text-sm">{entry.notes}</p>
                      </div>
                    )}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
                      <div className="p-3 bg-gray-700 rounded">
                        <p className="text-xs text-gray-400">Area Code</p>
                        <p className="text-white font-semibold">{entry.areaCode}</p>
                      </div>
                      <div className="p-3 bg-gray-700 rounded">
                        <p className="text-xs text-gray-400">Location Zone</p>
                        <p className="text-white font-semibold">{getLocationInfo(entry.areaCode)}</p>
                      </div>
                      <div className="p-3 bg-gray-700 rounded">
                        <p className="text-xs text-gray-400">Added Date</p>
                        <p className="text-white font-semibold">{entry.dateAdded}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => toggleTrusted(entry.id)}
                        className={`flex-1 px-4 py-2 rounded font-semibold transition text-sm ${
                          entry.trusted ? 'bg-yellow-600 text-white' : 'bg-gray-700 text-gray-300'
                        }`}
                      >
                        {entry.trusted ? '⭐ Trusted' : '☆ Mark Trusted'}
                      </button>
                      <button
                        onClick={() => toggleBlocked(entry.id)}
                        className={`flex-1 px-4 py-2 rounded font-semibold transition text-sm ${
                          entry.blocked ? 'bg-red-600 text-white' : 'bg-gray-700 text-gray-300'
                        }`}
                      >
                        {entry.blocked ? '🚫 Blocked' : '🔓 Block'}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}

          {selectedTab === 'calls' && (
            <div className="space-y-4">
              {filteredNumbers.length > 0 ? (
                filteredNumbers.map(entry => (
                  entry.callLogs.length > 0 && (
                    <div key={entry.id} className="bg-gray-800 rounded-lg p-4 md:p-6 border border-gray-700">
                      <h3 className="text-lg font-bold text-white mb-4">{entry.name} - {entry.number}</h3>
                      <div className="space-y-2">
                        {entry.callLogs.map((log, idx) => (
                          <div key={idx} className="flex items-center gap-3 p-3 bg-gray-700 rounded">
                            <Clock className="w-4 h-4 text-blue-400" />
                            <div className="flex-grow">
                              <p className="text-white font-semibold text-sm">{log.date} • {log.time}</p>
                              <p className="text-gray-400 text-sm">Duration: {log.duration}</p>
                            </div>
                            <span className={`px-3 py-1 rounded text-xs font-semibold ${log.type === 'incoming' ? 'bg-green-600 text-white' : 'bg-blue-600 text-white'}`}>
                              {log.type === 'incoming' ? '📥 Incoming' : '📤 Outgoing'}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                ))
              ) : (
                <div className="text-center py-12 bg-gray-800 rounded-lg border border-gray-700">
                  <Clock className="w-12 h-12 text-gray-500 mx-auto mb-3" />
                  <p className="text-gray-400 text-lg">No call logs found</p>
                </div>
              )}
            </div>
          )}

          {selectedTab === 'blocked' && (
            <div className="space-y-4">
              {filteredNumbers.filter(n => n.blocked).length > 0 ? (
                filteredNumbers.filter(n => n.blocked).map(entry => (
                  <div key={entry.id} className="bg-gray-800 rounded-lg p-4 md:p-6 border-l-4 border-l-red-500 border border-gray-700">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-bold text-white mb-2">{entry.name}</h3>
                        <p className="text-gray-300 font-mono text-sm">{entry.number}</p>
                        <p className="text-gray-400 text-sm mt-2">Blocked since: {entry.dateAdded}</p>
                      </div>
                      <button
                        onClick={() => toggleBlocked(entry.id)}
                        className="px-4 py-2 bg-green-600 text-white rounded font-semibold hover:bg-green-700 transition text-sm"
                      >
                        Unblock
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 bg-gray-800 rounded-lg border border-gray-700">
                  <AlertCircle className="w-12 h-12 text-gray-500 mx-auto mb-3" />
                  <p className="text-gray-400 text-lg">No blocked numbers</p>
                </div>
              )}
            </div>
          )}

          {filteredNumbers.length === 0 && selectedTab === 'overview' && (
            <div className="text-center py-12 bg-gray-800 rounded-lg border border-gray-700">
              <Phone className="w-12 h-12 text-gray-500 mx-auto mb-3" />
              <p className="text-gray-400 text-lg">No phone numbers found</p>
              <p className="text-gray-500 text-sm">Add your first phone number to get started!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}