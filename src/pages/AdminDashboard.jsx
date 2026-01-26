import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Trash2, User, Layout, Briefcase, MessageSquare, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('messages'); // Tabs: messages, services, projects, users

    // Data States
    const [messages, setMessages] = useState([]);
    const [services, setServices] = useState([]);
    const [projects, setProjects] = useState([]);
    const [users, setUsers] = useState([]);

    // Form States
    const [newService, setNewService] = useState({ title: '', description: '', iconName: 'Layout' });
    const [newProject, setNewProject] = useState({ title: '', category: '', description: '', imageUrl: '' });

    // --- SECURITY CHECK (වැදගත්ම වෙනස මෙතන) ---
    useEffect(() => {
        const auth = localStorage.getItem('isAuthenticated');
        const role = localStorage.getItem('userRole'); // Role එක ගන්නවා

        // Log වෙලා නැත්නම් හෝ Role එක ADMIN නෙවෙයි නම් එළියට දානවා
        if (!auth || role !== 'ADMIN') { 
            alert("Access Denied! Admins Only.");
            navigate('/login'); 
        } else { 
            fetchAllData(); // ඇඩ්මින් නම් විතරක් ඩේටා ටික ගේනවා
        }
    }, [navigate]);

    const fetchAllData = async () => {
        try {
            const msgRes = await axios.get("http://localhost:8080/api/contact/all");
            setMessages(msgRes.data);
            
            const srvRes = await axios.get("http://localhost:8080/api/admin/services");
            setServices(srvRes.data);

            const prjRes = await axios.get("http://localhost:8080/api/admin/projects");
            setProjects(prjRes.data);

            const usrRes = await axios.get("http://localhost:8080/api/admin/users");
            setUsers(usrRes.data);
        } catch (error) { 
            console.error("Error fetching data", error);
            // Backend එකෙන් Error ආවොත් (403 Forbidden වගේ)
            if(error.response && error.response.status === 403) {
                alert("Session Expired or Access Denied");
                navigate('/login');
            }
        }
    };

    // --- DELETE FUNCTIONS ---
    const deleteItem = async (url, id, setData, data) => {
        if(window.confirm("Are you sure?")) {
            try {
                await axios.delete(url + id);
                setData(data.filter(item => item.id !== id));
            } catch (error) {
                alert("Error deleting item");
            }
        }
    };

    // --- ADD FUNCTIONS ---
    const handleAddService = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:8080/api/admin/services/add", newService);
            setServices([...services, res.data]);
            setNewService({ title: '', description: '', iconName: 'Layout' });
            alert("Service Added!");
        } catch (error) {
            alert("Error adding service");
        }
    };

    const handleAddProject = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:8080/api/admin/projects/add", newProject);
            setProjects([...projects, res.data]);
            setNewProject({ title: '', category: '', description: '', imageUrl: '' });
            alert("Project Added!");
        } catch (error) {
            alert("Error adding project");
        }
    };

    // --- UI COMPONENTS ---
    return (
        <div className="home-container" style={{ paddingTop: '100px', minHeight: '100vh', display: 'flex' }}>
            
            {/* SIDEBAR */}
            <div style={{ width: '250px', background: '#1e293b', padding: '20px', minHeight: '80vh', borderRight: '1px solid #334155' }}>
                <h3 style={{ color: '#a855f7', marginBottom: '30px' }}>Admin Panel</h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    <li onClick={() => setActiveTab('messages')} style={tabStyle(activeTab === 'messages')}><MessageSquare size={18}/> Messages</li>
                    <li onClick={() => setActiveTab('services')} style={tabStyle(activeTab === 'services')}><Layout size={18}/> Services</li>
                    <li onClick={() => setActiveTab('projects')} style={tabStyle(activeTab === 'projects')}><Briefcase size={18}/> Projects</li>
                    <li onClick={() => setActiveTab('users')} style={tabStyle(activeTab === 'users')}><User size={18}/> Users</li>
                </ul>
            </div>

            {/* MAIN CONTENT AREA */}
            <div style={{ flex: 1, padding: '30px' }}>
                
                {/* 1. MESSAGES TAB */}
                {activeTab === 'messages' && (
                    <div>
                        <h2>Inbox ({messages.length})</h2>
                        {messages.length === 0 ? <p style={{color:'#64748b'}}>No new messages.</p> : 
                            messages.map(msg => (
                                <div key={msg.id} className="admin-card">
                                    <div>
                                        <h4>{msg.name} <span style={{fontSize:'0.8rem', color:'#94a3b8'}}>({msg.email})</span></h4>
                                        <p>{msg.message}</p>
                                    </div>
                                    <button onClick={() => deleteItem("http://localhost:8080/api/contact/delete/", msg.id, setMessages, messages)} className="btn-delete"><Trash2 size={18}/></button>
                                </div>
                            ))
                        }
                    </div>
                )}

                {/* 2. SERVICES TAB */}
                {activeTab === 'services' && (
                    <div>
                        <h2>Manage Services</h2>
                        <form onSubmit={handleAddService} className="admin-form">
                            <input type="text" placeholder="Service Title" value={newService.title} onChange={e => setNewService({...newService, title: e.target.value})} required/>
                            <input type="text" placeholder="Description" value={newService.description} onChange={e => setNewService({...newService, description: e.target.value})} required/>
                            <button type="submit" className="btn-add"><Plus size={18}/> Add Service</button>
                        </form>

                        <div className="grid-list">
                            {services.map(srv => (
                                <div key={srv.id} className="admin-card">
                                    <div><h3>{srv.title}</h3><p>{srv.description}</p></div>
                                    <button onClick={() => deleteItem("http://localhost:8080/api/admin/services/delete/", srv.id, setServices, services)} className="btn-delete"><Trash2 size={18}/></button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* 3. PROJECTS TAB */}
                {activeTab === 'projects' && (
                    <div>
                        <h2>Manage Projects</h2>
                        <form onSubmit={handleAddProject} className="admin-form">
                            <input type="text" placeholder="Project Title" value={newProject.title} onChange={e => setNewProject({...newProject, title: e.target.value})} required/>
                            <input type="text" placeholder="Category" value={newProject.category} onChange={e => setNewProject({...newProject, category: e.target.value})} required/>
                            <input type="text" placeholder="Image URL" value={newProject.imageUrl} onChange={e => setNewProject({...newProject, imageUrl: e.target.value})} required/>
                            <textarea placeholder="Description" value={newProject.description} onChange={e => setNewProject({...newProject, description: e.target.value})} required></textarea>
                            <button type="submit" className="btn-add"><Plus size={18}/> Add Project</button>
                        </form>

                        <div className="grid-list">
                            {projects.map(prj => (
                                <div key={prj.id} className="admin-card">
                                    <div><h3>{prj.title}</h3><span style={{color:'#ec4899'}}>{prj.category}</span></div>
                                    <button onClick={() => deleteItem("http://localhost:8080/api/admin/projects/delete/", prj.id, setProjects, projects)} className="btn-delete"><Trash2 size={18}/></button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                 {/* 4. USERS TAB */}
                 {activeTab === 'users' && (
                    <div>
                        <h2>Registered Users</h2>
                        {users.map(usr => (
                            <div key={usr.id} className="admin-card">
                                <div><h4>{usr.fullName}</h4><p>{usr.email}</p></div>
                                <div style={{background: usr.role === 'ADMIN' ? '#a855f7' : '#334155', padding: '5px 10px', borderRadius: '5px', fontSize: '0.8rem'}}>
                                    {usr.role || 'USER'}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

            </div>
        </div>
    );
};

// Simple Styles for this component
const tabStyle = (isActive) => ({
    padding: '15px', cursor: 'pointer', color: isActive ? 'white' : '#94a3b8',
    background: isActive ? '#a855f7' : 'transparent', borderRadius: '8px',
    marginBottom: '10px', display: 'flex', gap: '10px', alignItems: 'center', fontWeight: 'bold'
});

export default AdminDashboard;