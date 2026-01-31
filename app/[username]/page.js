// app/[username]/page.js

// আপনার ব্যাকএন্ডের URL (এটি প্রয়োজনে .env ফাইলে রাখবেন)
const API_BASE_URL = "https://lost-darsey-sbinc2jkj-81fcaf06.koyeb.app/api"; // অথবা যেখানে আপনার সার্ভার হোস্ট করা

// ডাটা ফেচ করার ফাংশন
async function getUserData(username) {
  try {
    // আপনার pbsnet-server এর সার্চ API ব্যবহার করছি
    const res = await fetch(`${API_BASE_URL}/api/users/search?username=${username}`, {
      cache: 'no-store' // রিয়েল-টাইম ডাটার জন্য ক্যাশ বন্ধ রাখা হলো
    });

    if (!res.ok) return null;

    const data = await res.json();
    
    // সার্চ রেজাল্ট যদি অ্যারে হয় এবং ডাটা থাকে
    if (data && data.users && data.users.length > 0) {
      return data.users[0]; // প্রথম ইউজারকে রিটার্ন করছি
    }
    return null;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}

export default async function UserProfile({ params }) {
  // ১. URL থেকে username নেওয়া
  const { username } = params;

  // ২. API থেকে ডাটা আনা
  const user = await getUserData(username);

  // ৩. যদি ইউজার না পাওয়া যায়
  if (!user) {
    return (
      <div style={styles.container}>
        <h1>404</h1>
        <p>User <strong>@{username}</strong> not found on pbsNet.</p>
        <a href="/" style={styles.link}>Go Home</a>
      </div>
    );
  }

  // ৪. প্রোফাইল দেখানো (আপনার pbsnet-server এর ফিল্ড অনুযায়ী)
  return (
    <div style={styles.container}>
        <div style={styles.card}>
            {/* প্রোফাইল পিকচার (যদি থাকে) */}
            <div style={styles.avatarPlaceholder}>
                {user.full_name.charAt(0).toUpperCase()}
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

// সাধারণ CSS স্টাইল (দ্রুত দেখার জন্য)
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
    width: '100%'
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
  contact: { fontWeight: 'bold', color: '#0070f3' },
  link: { color: '#0070f3', textDecoration: 'underline' }
};