const { useState, useEffect } = React;

// Sample data
const SAMPLE_DATA = {
  users: {
    'admin@civic.gov': { 
      password: 'admin123', 
      role: 'Admin', 
      // role: 'Municipal',
      // name: 'John Administrator',
       name: 'Rajesh Municipal',
     
      department: 'Municipal'
    },
    'municipal@civic.gov': { 
      password: 'municipal123', 
      role: 'Municipal Officer', 
      // name: 'Sarah Municipal',
      name: 'Rajesh Municipal',
      department: 'Municipal'
    },
    'electricity@civic.gov': { 
      password: 'electric123', 
      role: 'Electricity Officer', 
      // name: 'Mike Electric',
      name: 'Ramesh Electric',
      department: 'Electricity'
    },
    'water@civic.gov': { 
      password: 'water123', 
      role: 'Water Officer', 
      // name: 'Lisa Water',
      name: 'Rahul Water',
      department: 'Water'
    },
    'field@civic.gov': { 
      password: 'field123', 
      role: 'Field Worker', 
      // name: 'Tom Field',
      name: 'Shivendra Field',
      department: 'Municipal'
    }
  },
  issues: [
    {
      id: 'ISS-001',
      title: 'Pothole on Main Street',
      description: 'Large pothole causing traffic issues',
      type: 'Pothole',
      priority: 'High',
      status: 'Received',
      // location: 'Main Street & 2nd Ave',
      location: 'Ordance factory ,Muradnagar, Ghaziabad, UP',
      coordinates: [40.7128, -74.0060],
      reportedBy: 'John Doe',
      // reportedAt: '2025-01-15T10:30:00Z',
      reportedAt: '2025-09-08T10:30:00Z',
      department: 'Municipal',
      assignedTo: null,
      ward: 'Ward 1'
    },
    {
      id: 'ISS-002',
      title: 'Street light not working',
      description: 'Street light flickering and intermittent',
      type: 'Streetlight',
      priority: 'Medium',
      status: 'In Progress',
      // location: 'Park Ave & 5th St',
      location: 'Railway Road, Muradnagar, Ghaziabad, UP',
      coordinates: [40.7589, -73.9851],
      reportedBy: 'Jane Smith',
      // reportedAt: '2025-01-14T15:45:00Z',
      reportedAt: '2025-09-01T15:45:00Z',
      department: 'Electricity',
      // assignedTo: 'Mike Electric',
      assignedTo: 'Ramesh Electric',
      ward: 'Ward 2'
    },
    {
      id: 'ISS-003',
      title: 'Garbage overflow',
      description: 'Trash bin overflowing at park entrance',
      type: 'Garbage',
      priority: 'Medium',
      status: 'Assigned',
      // location: 'Central Park Entrance',
      location: 'Central Park, Modi Nagar, Ghaziabad, UP',
      coordinates: [40.7831, -73.9712],
      reportedBy: 'Bob Johnson',
      // reportedAt: '2025-01-13T09:15:00Z',
      reportedAt: '2025-08-25T09:15:00Z',
      department: 'Sanitation',
      // assignedTo: 'Tom Field',
      assignedTo: 'Shivendra Field',
      ward: 'Ward 1'
    },
    {
      id: 'ISS-004',
      title: 'Water leak on Oak Street',
      description: 'Pipe burst causing water waste',
      type: 'Water Leak',
      priority: 'Critical',
      status: 'Resolved',
      // location: 'Oak Street & 1st Ave',
      location: 'Near RapidX , Duhai, Ghaziabad, UP',
      coordinates: [40.7505, -73.9934],
      reportedBy: 'Alice Brown',
      // reportedAt: '2025-01-12T14:20:00Z',
      reportedAt: '2025-08-03T14:20:00Z',
      department: 'Water',
      // assignedTo: 'Lisa Water',
      assignedTo: 'Rahul Water',
      ward: 'Ward 3'
    },
    {
      id: 'ISS-005',
      title: 'Electrical wire hanging',
      description: 'Power line dangling dangerously low',
      type: 'Electrical',
      priority: 'Critical',
      status: 'In Progress',
      // location: 'Elm Street & 3rd Ave',
      location: 'Hapur Road, Muradnagar, Ghaziabad, UP',
      coordinates: [40.7614, -73.9776],
      reportedBy: 'David Wilson',
      // reportedBy: 'Ramesh Electric',
      // reportedAt: '2025-01-11T16:30:00Z',
      reportedAt: '2025-07-20T16:30:00Z',
      department: 'Electricity',
      // assignedTo: 'Mike Electric',
      assignedTo: 'Ramesh Electric',
      ward: 'Ward 2'
    }
  ],
  contractors: [
    { id: 1, name: 'ElectricPro Services', specialty: 'Electrical', rating: 4.8, available: true },
    { id: 2, name: 'PowerLine Contractors', specialty: 'Electrical', rating: 4.6, available: true },
    { id: 3, name: 'City Water Works', specialty: 'Water', rating: 4.7, available: false },
    { id: 4, name: 'Municipal Maintenance', specialty: 'General', rating: 4.5, available: true }
  ]
};

// Login Component
function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    console.log('Login attempt:', { email, password });

    // Simple validation
    if (!email || !password) {
      setError('Please enter both email and password');
      setLoading(false);
      return;
    }

    // Simulate API call delay
    setTimeout(() => {
      const user = SAMPLE_DATA.users[email];
      console.log('User found:', user);
      
      if (user && user.password === password) {
        console.log('Login successful');
        onLogin(user);
      } else {
        setError('Invalid credentials. Try admin@civic.gov / admin123');
      }
      setLoading(false);
    }, 500);
  };

  return (
    
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
       
          <div className="login-logo">🏛️  CivicCare </div>
          <p className="login-subtitle">Municipal Dashboard</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@civic.gov"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              disabled={loading}
            />
          </div>

          <button 
            type="submit" 
            className="btn btn--primary btn--full-width"
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        <div style={{marginTop: '20px', fontSize: '12px', color: '#6b7280'}}>
          <strong>"Every issue solved is a step toward cleaner, safer, and happier communities"</strong><br/>
          As a government leader, every issue you resolve shapes the daily lives of citizens and builds trust in your community. By responding to reports, you're not just fixing problems — you're creating safer streets, cleaner neighborhoods, and a stronger bond between people and their government.
Your dedication turns challenges into progress and inspires citizens to believe in positive change.
        </div>
        {/* {<div style={{marginTop: '20px', fontSize: '15px', color: '#18231aff'}}>
          <strong>"Every issue solved is a step toward cleaner, safer, and happier communities"</strong><br/>
          As a government leader, every issue you resolve shapes the daily lives of citizens and builds trust in your community. By responding to reports, you're not just fixing problems — you're creating safer streets, cleaner neighborhoods, and a stronger bond between people and their government.
Your dedication turns challenges into progress and inspires citizens to believe in positive change.
        </div>} */}

        {/* <div style={{marginTop: '20px', fontSize: '12px', color: '#6b7280'}}>
          <strong>Demo Accounts:</strong><br/>
          Admin: admin@civic.gov / admin123<br/>
          Municipal: municipal@civic.gov / municipal123<br/>
          Electricity: electricity@civic.gov / electric123<br/>
          Field Worker: field@civic.gov / field123
        </div> */}
      </div>
    </div>
  );
}

// Sidebar Component
function Sidebar({ user, activeSection, setActiveSection }) {
  const getMenuItems = () => {
    const baseItems = [
      { id: 'dashboard', icon: 'fas fa-tachometer-alt', label: 'Dashboard' },
      { id: 'issues', icon: 'fas fa-exclamation-triangle', label: 'Issues' },
      { id: 'analytics', icon: 'fas fa-chart-bar', label: 'Analytics' }
    ];

    if (user.role === 'Admin' || user.role === 'Municipal Officer') {
      baseItems.push({ id: 'departments', icon: 'fas fa-building', label: 'Departments' });
    }

    if (user.role === 'Electricity Officer') {
      baseItems.push({ id: 'contractors', icon: 'fas fa-hard-hat', label: 'Contractors' });
    }

    baseItems.push(
      { id: 'reports', icon: 'fas fa-file-alt', label: 'Reports' },
      { id: 'settings', icon: 'fas fa-cog', label: 'Settings' }
    );

    return baseItems;
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-logo">🏛️ CivicCare</div>
      </div>
      
      <nav className="sidebar-nav">
        {getMenuItems().map(item => (
          <a
            key={item.id}
            className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
            onClick={() => setActiveSection(item.id)}
          >
            <i className={item.icon}></i>
            {item.label}
          </a>
        ))}
      </nav>
    </div>
  );
}

// Header Component
function Header({ user, onLogout }) {
  return (
    <header className="header">
      <div>
        <h1 className="header-title">{user.role} Dashboard</h1>
        <p style={{margin: 0, color: 'var(--color-text-secondary)', fontSize: '14px'}}>
          Welcome back, {user.name}
        </p>
      </div>
      
      <div className="header-actions">
        <div className="notification-bell">
          <i className="fas fa-bell"></i>
          <span className="notification-badge">3</span>
        </div>
        
        <div className="user-menu" onClick={onLogout}>
          <div className="user-avatar">
            {user.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <div style={{fontSize: '14px', fontWeight: '500'}}>{user.name}</div>
            <div style={{fontSize: '12px', color: 'var(--color-text-secondary)'}}>
              {user.department}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

// Overview Cards Component
function OverviewCards({ user, issues }) {
  const getCardData = () => {
    let filteredIssues = issues;
    
    if (user.role !== 'Admin') {
      filteredIssues = issues.filter(issue => issue.department === user.department);
    }

    const total = filteredIssues.length;
    const resolved = filteredIssues.filter(i => i.status === 'Resolved' || i.status === 'Closed').length;
    const pending = filteredIssues.filter(i => i.status === 'Received').length;
    const inProgress = filteredIssues.filter(i => i.status === 'In Progress' || i.status === 'Assigned').length;

    return [
      {
        title: 'Total Issues',
        value: total,
        change: '+12%',
        positive: true,
        icon: 'fas fa-exclamation-triangle',
        color: '#3b82f6'
      },
      {
        title: 'Resolved',
        value: resolved,
        change: '+5%',
        positive: true,
        icon: 'fas fa-check-circle',
        color: '#059669'
      },
      {
        title: 'Pending',
        value: pending,
        change: '-8%',
        positive: false,
        icon: 'fas fa-clock',
        color: '#d97706'
      },
      {
        title: 'In Progress',
        value: inProgress,
        change: '+15%',
        positive: true,
        icon: 'fas fa-cog',
        color: '#dc2626'
      }
    ];
  };

  return (
    <div className="overview-cards">
      {getCardData().map((card, index) => (
        <div key={index} className="overview-card">
          <div className="overview-card-header">
            <span className="overview-card-title">{card.title}</span>
            <div 
              className="overview-card-icon"
              style={{backgroundColor: card.color}}
            >
              <i className={card.icon}></i>
            </div>
          </div>
          
          <div className="overview-card-value">{card.value}</div>
          
          <div className={`overview-card-change ${card.positive ? 'positive' : 'negative'}`}>
            <i className={`fas fa-arrow-${card.positive ? 'up' : 'down'}`}></i>
            {card.change} from last month
          </div>
        </div>
      ))}
    </div>
  );
}

// Filters Component
function Filters({ filters, setFilters }) {
  const issueTypes = ['All', 'Pothole', 'Streetlight', 'Garbage', 'Vandalism', 'Water Leak', 'Electrical', 'Other'];
  const statuses = ['All', 'Received', 'Assigned', 'In Progress', 'Resolved', 'Closed'];
  const priorities = ['All', 'Low', 'Medium', 'High', 'Critical'];

  return (
    <div className="filters-section">
      <div className="filters-header">
        <h3 className="filters-title">Filter Issues</h3>
        <button 
          className="btn btn--outline btn--sm"
          onClick={() => setFilters({
            search: '',
            type: 'All',
            status: 'All',
            priority: 'All'
          })}
        >
          Clear Filters
        </button>
      </div>

      <div className="filters-grid">
        <div className="filter-group">
          <label className="filter-label">Search</label>
          <div className="search-box">
            <input
              type="text"
              className="form-control search-input"
              placeholder="Search issues..."
              value={filters.search}
              onChange={(e) => setFilters({...filters, search: e.target.value})}
            />
            <i className="fas fa-search search-icon"></i>
          </div>
        </div>

        <div className="filter-group">
          <label className="filter-label">Issue Type</label>
          <select
            className="form-control"
            value={filters.type}
            onChange={(e) => setFilters({...filters, type: e.target.value})}
          >
            {issueTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label className="filter-label">Status</label>
          <select
            className="form-control"
            value={filters.status}
            onChange={(e) => setFilters({...filters, status: e.target.value})}
          >
            {statuses.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label className="filter-label">Priority</label>
          <select
            className="form-control"
            value={filters.priority}
            onChange={(e) => setFilters({...filters, priority: e.target.value})}
          >
            {priorities.map(priority => (
              <option key={priority} value={priority}>{priority}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

// Issues Table Component
function IssuesTable({ issues, user, onAssignIssue, onUpdateStatus }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="issues-container">
      <div className="issues-header">
        <h3 className="issues-title">Issues List ({issues.length})</h3>
        <div className="quick-actions">
          <button className="quick-action-btn">
            <i className="fas fa-download"></i> Export
          </button>
          <button className="quick-action-btn">
            <i className="fas fa-plus"></i> Bulk Assign
          </button>
        </div>
      </div>

      <div style={{overflowX: 'auto'}}>
        <table className="issues-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Type</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Location</th>
              <th>Reported</th>
              <th>Assigned To</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {issues.map(issue => (
              <tr key={issue.id}>
                <td style={{fontWeight: '600', color: 'var(--color-primary)'}}>{issue.id}</td>
                <td>
                  <div style={{fontWeight: '500'}}>{issue.title}</div>
                  <div style={{fontSize: '12px', color: 'var(--color-text-secondary)', marginTop: '2px'}}>
                    {issue.description.substring(0, 50)}...
                  </div>
                </td>
                <td>{issue.type}</td>
                <td>
                  <span className={`priority-badge ${issue.priority.toLowerCase()}`}>
                    {issue.priority}
                  </span>
                </td>
                <td>
                  <span className={`status-badge ${issue.status.toLowerCase().replace(' ', '-')}`}>
                    {issue.status}
                  </span>
                </td>
                <td>
                  <div style={{fontSize: '13px'}}>
                    {issue.location}
                    <div style={{fontSize: '11px', color: 'var(--color-text-secondary)'}}>
                      {issue.ward}
                    </div>
                  </div>
                </td>
                <td>{formatDate(issue.reportedAt)}</td>
                <td>{issue.assignedTo || 'Unassigned'}</td>
                <td>
                  <div style={{display: 'flex', gap: '8px'}}>
                    {!issue.assignedTo && (
                      <button
                        className="btn btn--outline btn--sm"
                        onClick={() => onAssignIssue(issue)}
                        style={{fontSize: '11px', padding: '4px 8px'}}
                      >
                        Assign
                      </button>
                    )}
                    <button
                      className="btn btn--secondary btn--sm"
                      onClick={() => onUpdateStatus(issue)}
                      style={{fontSize: '11px', padding: '4px 8px'}}
                    >
                      Update
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Assignment Modal Component
function AssignmentModal({ isOpen, onClose, issue, onAssign }) {
  const [assignedTo, setAssignedTo] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState(issue?.priority || 'Medium');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAssign(issue.id, { assignedTo, dueDate, priority, notes });
    onClose();
    // Reset form
    setAssignedTo('');
    setDueDate('');
    setNotes('');
  };

  if (!isOpen || !issue) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h3 className="modal-title">Assign Issue: {issue.title}</h3>
          <button className="close-button" onClick={onClose}>&times;</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Assign To</label>
            <select
              className="form-control"
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
              required
            >
              <option value="">Select assignee...</option>
              <option value="Tom Field">Shivendra Field (Field Worker)</option>
              <option value="Mike Electric">Ramesh Electric (Electrician)</option>
              <option value="Lisa Water">Rahul Water (Plumber)</option>
              <option value="Sarah Municipal">Rajesh Municipal (Municipal)</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Due Date</label>
            <input
              type="date"
              className="form-control"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Priority</label>
            <select
              className="form-control"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Critical">Critical</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Notes</label>
            <textarea
              className="form-control"
              rows="3"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any special instructions..."
            />
          </div>

          <div style={{display: 'flex', gap: '12px', justifyContent: 'flex-end'}}>
            <button type="button" className="btn btn--outline" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn--primary">
              Assign Issue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Map View Component
function MapView({ issues }) {
  return (
    <div className="map-container">
      <div className="map-header">
        <h3>Issues Map</h3>
        <div style={{display: 'flex', gap: '8px'}}>
          <button className="btn btn--outline btn--sm">
            <i className="fas fa-layer-group"></i> Layers
          </button>
          <button className="btn btn--outline btn--sm">
            <i className="fas fa-filter"></i> Filter Map
          </button>
        </div>
      </div>
      
      <div className="map-placeholder">
        <div style={{textAlign: 'center'}}>
          <i className="fas fa-map-marked-alt" style={{fontSize: '48px', marginBottom: '16px', opacity: 0.5}}></i>
          <p>Interactive Map View</p>
          <p style={{fontSize: '14px', opacity: 0.7}}>
            Showing {issues.length} issues across the city
          </p>
        </div>
      </div>
    </div>
  );
}

// Analytics View Component
function AnalyticsView({ issues }) {
  return (
    <div className="analytics-section">
      <div className="analytics-grid">
        <div className="chart-container">
          <div className="chart-header">
            <h3 className="chart-title">Issue Trends</h3>
            <p style={{color: 'var(--color-text-secondary)', fontSize: '14px'}}>
              Monthly comparison of reported vs resolved issues
            </p>
          </div>
          <div style={{
            height: '300px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            background: 'var(--color-bg-1)',
            borderRadius: '8px'
          }}>
            Chart Placeholder - Analytics Dashboard
          </div>
        </div>

        <div>
          <div className="chart-container" style={{height: '180px', marginBottom: '20px'}}>
            <div className="chart-header">
              <h4>Response Time</h4>
            </div>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100px'}}>
              <div style={{textAlign: 'center'}}>
                <div style={{fontSize: '32px', fontWeight: 'bold', color: 'var(--color-primary)'}}>
                  2.3
                </div>
                <div style={{fontSize: '14px', color: 'var(--color-text-secondary)'}}>
                  Average Days
                </div>
              </div>
            </div>
          </div>

          <div className="chart-container" style={{height: '180px'}}>
            <div className="chart-header">
              <h4>Satisfaction Score</h4>
            </div>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100px'}}>
              <div style={{textAlign: 'center'}}>
                <div style={{fontSize: '32px', fontWeight: 'bold', color: 'var(--color-success)'}}>
                  85%
                </div>
                <div style={{fontSize: '14px', color: 'var(--color-text-secondary)'}}>
                  Citizen Rating
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Contractor Panel Component
function ContractorPanel({ contractors }) {
  return (
    <div className="contractor-panel">
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
        <h3>Available Contractors</h3>
        <button className="btn btn--primary btn--sm">
          <i className="fas fa-plus"></i> Add Contractor
        </button>
      </div>

      <div className="contractor-list">
        {contractors.map(contractor => (
          <div key={contractor.id} className="contractor-item">
            <div className="contractor-info">
              <h4>{contractor.name}</h4>
              <p>{contractor.specialty} • Rating: {contractor.rating}/5</p>
            </div>
            <div>
              <span 
                className={`status-badge ${contractor.available ? 'resolved' : 'received'}`}
                style={{marginRight: '8px'}}
              >
                {contractor.available ? 'Available' : 'Busy'}
              </span>
              {contractor.available && (
                <button className="btn btn--outline btn--sm">
                  Assign
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Main Dashboard Component
function Dashboard({ user, onLogout }) {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [issues, setIssues] = useState(SAMPLE_DATA.issues);
  const [filteredIssues, setFilteredIssues] = useState(SAMPLE_DATA.issues);
  const [filters, setFilters] = useState({
    search: '',
    type: 'All',
    status: 'All',
    priority: 'All'
  });
  const [assignmentModal, setAssignmentModal] = useState({ isOpen: false, issue: null });

  // Filter issues based on user role and filters
  useEffect(() => {
    let filtered = issues;

    // Role-based filtering
    if (user.role !== 'Admin') {
      filtered = filtered.filter(issue => issue.department === user.department);
    }

    // Apply filters
    if (filters.search) {
      filtered = filtered.filter(issue => 
        issue.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        issue.description.toLowerCase().includes(filters.search.toLowerCase()) ||
        issue.location.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters.type !== 'All') {
      filtered = filtered.filter(issue => issue.type === filters.type);
    }

    if (filters.status !== 'All') {
      filtered = filtered.filter(issue => issue.status === filters.status);
    }

    if (filters.priority !== 'All') {
      filtered = filtered.filter(issue => issue.priority === filters.priority);
    }

    setFilteredIssues(filtered);
  }, [issues, filters, user.role, user.department]);

  const handleAssignIssue = (issue) => {
    setAssignmentModal({ isOpen: true, issue });
  };

  const handleUpdateStatus = (issue) => {
    const statusOrder = ['Received', 'Assigned', 'In Progress', 'Resolved', 'Closed'];
    const currentIndex = statusOrder.indexOf(issue.status);
    const nextStatus = statusOrder[currentIndex + 1] || 'Closed';
    
    setIssues(issues.map(i => 
      i.id === issue.id ? { ...i, status: nextStatus } : i
    ));
  };

  const handleAssignment = (issueId, assignment) => {
    setIssues(issues.map(issue => 
      issue.id === issueId 
        ? { 
            ...issue, 
            assignedTo: assignment.assignedTo, 
            status: 'Assigned', 
            priority: assignment.priority 
          }
        : issue
    ));
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <>
            <OverviewCards user={user} issues={filteredIssues} />
            <div className="dashboard-grid">
              <div>
                <Filters filters={filters} setFilters={setFilters} />
                <IssuesTable 
                  issues={filteredIssues.slice(0, 10)} 
                  user={user}
                  onAssignIssue={handleAssignIssue}
                  onUpdateStatus={handleUpdateStatus}
                />
              </div>
              <MapView issues={filteredIssues} />
            </div>
          </>
        );
      case 'issues':
        return (
          <>
            <Filters filters={filters} setFilters={setFilters} />
            <IssuesTable 
              issues={filteredIssues} 
              user={user}
              onAssignIssue={handleAssignIssue}
              onUpdateStatus={handleUpdateStatus}
            />
          </>
        );
      case 'analytics':
        return <AnalyticsView issues={filteredIssues} />;
      case 'contractors':
        return user.role === 'Electricity Officer' ? 
          <ContractorPanel contractors={SAMPLE_DATA.contractors} /> :
          <div>Access Denied - This section is only available to Electricity Officers</div>;
      default:
        return (
          <div className="loading">
            <div className="spinner"></div>
          </div>
        );
    }
  };

  return (
    <div className="dashboard">
      <Sidebar 
        user={user} 
        activeSection={activeSection} 
        setActiveSection={setActiveSection} 
      />
      
      <div className="main-content">
        <Header user={user} onLogout={onLogout} />
        
        <main className="content">
          {renderContent()}
        </main>
      </div>

      <AssignmentModal
        isOpen={assignmentModal.isOpen}
        onClose={() => setAssignmentModal({ isOpen: false, issue: null })}
        issue={assignmentModal.issue}
        onAssign={handleAssignment}
      />
    </div>
  );
}

// Main App Component
function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    console.log('App: User logged in', userData);
    setUser(userData);
  };

  const handleLogout = () => {
    console.log('App: User logged out');
    setUser(null);
  };

  return (
    <div>
      {user ? (
        <Dashboard user={user} onLogout={handleLogout} />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}

// Render the app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);