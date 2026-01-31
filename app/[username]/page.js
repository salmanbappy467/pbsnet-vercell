// app/[username]/page.js

// ✅ ফিক্স ১: URL থেকে শেষের '/api' বাদ দেওয়া হয়েছে
const API_BASE_URL = "https://lost-darsey-sbinc2jkj-81fcaf06.koyeb.app"; 

async function getUserData(username) {
  try {
    // এখানে /api যোগ করা আছে, তাই উপরের ভেরিয়েবলে সেটা বাদ দিতে হবে
    const res = await fetch(`${API_BASE_URL}/api/users/search?username=${username}`, {
      cache: 'no-store'
    });

    if (!res.ok) return null;
    const data = await res.json();
    
    // ডাটা আছে কিনা চেক করা
    if (data && data.users && data.users.length > 0) {
      return data.users[0];
    }
    return null;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}

export default async function UserProfile({ params }) {
  // ✅ Next.js 15/16 ফিক্স: params কে await করা হয়েছে
  const { username } = await params; 

  const user = await getUserData(username);

  // যদি ইউজার না পাওয়া যায়
  if (!user) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
            <h1 style={{color: 'red'}}>User Not Found</h1>
            <p>Could not find user: <strong>@{username}</strong></p>
            <a href="/" style={{color: 'blue', marginTop: '10px', display: 'block'}}>Go Home</a>
        </div>
      </div>
    );
  }

  // প্রোফাইল দেখানো
  return (
    <div style={styles.container}>
        <div style={styles.card}>
            <div style={styles.avatarPlaceholder}>
                {user.full_name?.charAt(0).toUpperCase() || '?'}
            </div>
            
            <h1 style={styles.name}>{user.full_name}</h1>
            <p style={styles.username}>@{user.username}</p>
            
            <div style={styles.infoBox}>
                <p><strong>Office:</strong> {user.office_name}</p>
                <p><strong>Designation:</strong> {user.post_name}</p>
                <p><strong>PBS:</strong> {user.pbs_name}</p>
            </div>

            <p style={styles.contact}>📞 {user.mobile}</p>
        </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#f0f2f5',
    fontFamily: 'Arial, sans-serif'
  },
  card: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    textAlign: 'center',
    maxWidth: '400px',
    width: '90%'
  },
  avatarPlaceholder: {
    width: '80px',
    height: '80px',
    backgroundColor: '#0070f3',
    color: 'white',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '2rem',
    fontWeight: 'bold',
    margin: '0 auto 1rem auto'
  },
  name: { margin: '0 0 5px 0', color: '#333' },
  username: { margin: '0 0 20px 0', color: '#666' },
  infoBox: {
    textAlign: 'left',
    backgroundColor: '#f9f9f9',
    padding: '15px',
    borderRadius: '8px',
    marginBottom: '15px'
  },
  contact: { fontWeight: 'bold', color: '#0070f3' }
};