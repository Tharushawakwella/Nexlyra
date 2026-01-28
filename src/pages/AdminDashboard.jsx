import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Trash2, User, Layout, Briefcase, MessageSquare, Plus, Edit3, Phone } from 'lucide-react'; // Phone Icon එක ගත්තා
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('messages'); 

    // Data States
    const [messages, setMessages] = useState([]);
    const [services, setServices] = useState([]);
    const [projects, setProjects] = useState([]);
    const [users, setUsers] = useState([]);
    
    // Site Settings States
    const [footerText, setFooterText] = useState('');
    const [contactInfo, setContactInfo] = useState({ email: '', phone: '', address: '' });

    // Form States
    const [newService, setNewService] = useState({ title: '', description: '', iconName: 'Layout' });
    const [newProject, setNewProject] = useState({ title: '', category: '', description: '', imageUrl: '' });

    // --- SECURITY CHECK ---
    useEffect(() => {
        const auth = localStorage.getItem('isAuthenticated');
        const role = localStorage.getItem('userRole');

        if (!auth || role !== 'ADMIN') { 
            alert("Access Denied! Admins Only.");
            navigate('/login'); 
        } else { 
            fetchAllData();
        }
    }, [navigate]);

    const fetchAllData = async () => {
        try { const msgRes = await axios.get("https://nexlyra.onrender.com/api/contact/all"); setMessages(msgRes.data); } catch (e) {}
        try { const srvRes = await axios.get("https://nexlyra.onrender.com/api/admin/services"); setServices(srvRes.data); } catch (e) {}
        try { const prjRes = await axios.get("https://nexlyra.onrender.com/api/admin/projects"); setProjects(prjRes.data); } catch (e) {}
        try { const usrRes = await axios.get("https://nexlyra.onrender.com/api/admin/users"); setUsers(usrRes.data); } catch (e) {}
        
        // Footer & Contact Info
        try { const footRes = await axios.get("https://nexlyra.onrender.com/api/footer/get"); if(footRes.data.text) setFooterText(footRes.data.text); } catch (e) {}
        try { const infoRes = await axios.get("https://nexlyra.onrender.com/api/contact-info/get"); if(infoRes.data) setContactInfo(infoRes.data); } catch (e) {}
    };

    const deleteItem = async (url, id, setData, data) => {
        if(window.confirm("Are you sure?")) {
            try { await axios.delete(url + id); setData(data.filter(item => item.id !== id)); } catch (e) { alert("Error deleting"); }
        }
    };

    const handleAddService = async (e) => {
        e.preventDefault();
        try { const res = await axios.post("https://nexlyra.onrender.com/api/admin/services/add", newService); setServices([...services, res.data]); setNewService({ title: '', description: '', iconName: 'Layout' }); alert("Service Added!"); } catch (e) { alert("Error adding service"); }
    };

    const handleAddProject = async (e) => {
        e.preventDefault();
        try { const res = await axios.post("https://nexlyra.onrender.com/api/admin/projects/add", newProject); setProjects([...projects, res.data]); setNewProject({ title: '', category: '', description: '', imageUrl: '' }); alert("Project Added!"); } catch (e) { alert("Error adding project"); }
    };

    const handleUpdateFooter = async () => {
        try { await axios.post("https://nexlyra.onrender.com/api/footer/update", { text: footerText }); alert("Footer Updated!"); } catch (e) { alert("Error updating footer"); }
    };

    const handleUpdateContactInfo = async () => {
        try { await axios.post("https://nexlyra.onrender.com/api/contact-info/update", contactInfo); alert("Contact Info Updated!"); } catch (e) { alert("Error updating contact info"); }
    };

    return (
        <div className="admin-container" style={{ paddingTop: '100px', minHeight: '100vh', display: 'flex' }}>
            
            {/* SIDEBAR */}
            <div style={{ width: '250px', background: '#ffffff', padding: '20px', minHeight: '80vh', borderRight: '1px solid #e2e8f0' }}>
                <h3 style={{ color: '#a855f7', marginBottom: '30px' }}>Admin Panel</h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    <li onClick={() => setActiveTab('messages')} style={tabStyle(activeTab === 'messages')}><MessageSquare size={18}/> Messages</li>
                    <li onClick={() => setActiveTab('services')} style={tabStyle(activeTab === 'services')}><Layout size={18}/> Services</li>
                    <li onClick={() => setActiveTab('projects')} style={tabStyle(activeTab === 'projects')}><Briefcase size={18}/> Projects</li>
                    <li onClick={() => setActiveTab('contact_info')} style={tabStyle(activeTab === 'contact_info')}><Phone size={18}/> Contact Info</li>
                    <li onClick={() => setActiveTab('footer')} style={tabStyle(activeTab === 'footer')}><Edit3 size={18}/> Footer</li>
                    <li onClick={() => setActiveTab('users')} style={tabStyle(activeTab === 'users')}><User size={18}/> Users</li>
                </ul>
            </div>

            {/* MAIN CONTENT */}
            <div style={{ flex: 1, padding: '30px' }}>
                
                {activeTab === 'messages' && (
                    <div><h2>Inbox ({messages.length})</h2> {messages.map(msg => (<div key={msg.id} className="admin-card"><div><h4>{msg.name}</h4><p>{msg.message}</p></div><button onClick={() => deleteItem("https://nexlyra.onrender.com/api/contact/delete/", msg.id, setMessages, messages)} className="btn-delete"><Trash2 size={18}/></button></div>))}</div>
                )}

                {activeTab === 'services' && (
                    <div><h2>Services</h2><form onSubmit={handleAddService} className="admin-form"><input type="text" placeholder="Title" value={newService.title} onChange={e => setNewService({...newService, title: e.target.value})} required/><input type="text" placeholder="Description" value={newService.description} onChange={e => setNewService({...newService, description: e.target.value})} required/><button className="btn-add"><Plus size={18}/> Add</button></form><div className="grid-list">{services.map(srv => (<div key={srv.id} className="admin-card"><div><h3>{srv.title}</h3><p>{srv.description}</p></div><button onClick={() => deleteItem("https://nexlyra.onrender.com/api/admin/services/delete/", srv.id, setServices, services)} className="btn-delete"><Trash2 size={18}/></button></div>))}</div></div>
                )}

                {activeTab === 'projects' && (
                    <div><h2>Projects</h2><form onSubmit={handleAddProject} className="admin-form"><input type="text" placeholder="Title" value={newProject.title} onChange={e => setNewProject({...newProject, title: e.target.value})} required/><input type="text" placeholder="Category" value={newProject.category} onChange={e => setNewProject({...newProject, category: e.target.value})} required/><input type="text" placeholder="Image URL" value={newProject.imageUrl} onChange={e => setNewProject({...newProject, imageUrl: e.target.value})} required/><button className="btn-add"><Plus size={18}/> Add</button></form><div className="grid-list">{projects.map(prj => (<div key={prj.id} className="admin-card"><div><h3>{prj.title}</h3><p>{prj.category}</p></div><button onClick={() => deleteItem("https://nexlyra.onrender.com/api/admin/projects/delete/", prj.id, setProjects, projects)} className="btn-delete"><Trash2 size={18}/></button></div>))}</div></div>
                )}

                {/* --- CONTACT INFO TAB (අලුත් කොටස) --- */}
                {activeTab === 'contact_info' && (
                    <div>
                        <h2>Update Contact Details</h2>
                        <div className="admin-form" style={{flexDirection:'column', maxWidth: '500px'}}>
                            <label>Email Address</label>
                            <input type="email" value={contactInfo.email} onChange={(e) => setContactInfo({...contactInfo, email: e.target.value})} />
                            
                            <label style={{marginTop:'10px'}}>Phone Number</label>
                            <input type="text" value={contactInfo.phone} onChange={(e) => setContactInfo({...contactInfo, phone: e.target.value})} />
                            
                            <label style={{marginTop:'10px'}}>Address</label>
                            <input type="text" value={contactInfo.address} onChange={(e) => setContactInfo({...contactInfo, address: e.target.value})} />
                            
                            <button onClick={handleUpdateContactInfo} className="btn-add" style={{marginTop:'20px'}}>Update Info</button>
                        </div>
                    </div>
                )}

                {activeTab === 'footer' && (
                    <div><h2>Footer Settings</h2><div className="admin-form" style={{flexDirection:'column'}}><label>Footer Text</label><input type="text" value={footerText} onChange={(e) => setFooterText(e.target.value)} style={{width:'100%'}} /><button onClick={handleUpdateFooter} className="btn-add" style={{marginTop:'10px'}}>Update Footer</button></div></div>
                )}

                {activeTab === 'users' && (<div><h2>Users</h2>{users.map(usr => (<div key={usr.id} className="admin-card"><div><h4>{usr.fullName}</h4><p>{usr.email}</p></div><div>{usr.role}</div></div>))}</div>)}
            </div>
        </div>
    );
};

const tabStyle = (isActive) => ({ padding: '15px', cursor: 'pointer', color: isActive ? 'white' : '#64748b', background: isActive ? '#a855f7' : 'transparent', borderRadius: '8px', marginBottom: '10px', display: 'flex', gap: '10px', alignItems: 'center', fontWeight: 'bold' });

export default AdminDashboard;