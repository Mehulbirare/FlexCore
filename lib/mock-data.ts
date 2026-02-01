
export const MOCK_USER = {
    id: "user_12345",
    email: "admin@flexcore.com",
    password: "admin", // In a real app never store cleartext, this is just for mock logic
    name: "Admin User",
    role: "admin",
    avatar: "/avatars/01.png"
};

export const MOCK_DASHBOARD_DATA = {
    revenue: [
        { month: "Jan", revenue: 18600, members: 80 },
        { month: "Feb", revenue: 30500, members: 200 },
        { month: "Mar", revenue: 23700, members: 120 },
        { month: "Apr", revenue: 73000, members: 190 },
        { month: "May", revenue: 20900, members: 130 },
        { month: "Jun", revenue: 21400, members: 140 },
    ],
    kpi: [
        { title: "Total Revenue", value: "$45,231.89", trend: "+20.1%", trendUp: true },
        { title: "Active Members", value: "+2350", trend: "+180.1%", trendUp: true },
        { title: "Attendance", value: "12,234", trend: "+19%", trendUp: true },
        { title: "Churn Rate", value: "2.4%", trend: "-4%", trendUp: false }
    ],
    recentSales: [
        { name: "Olivia Martin", email: "olivia.martin@email.com", amount: "+$1,999.00" },
        { name: "Jackson Lee", email: "jackson.lee@email.com", amount: "+$39.00" },
        { name: "Isabella Nguyen", email: "isabella.nguyen@email.com", amount: "+$299.00" },
        { name: "William Kim", email: "will@email.com", amount: "+$99.00" },
        { name: "Sofia Davis", email: "sofia.davis@email.com", amount: "+$39.00" }
    ]
};

export const MOCK_MEMBERS = [
    { id: "m1", name: "Alice Johnson", email: "alice@example.com", plan: "Platinum Elite", status: "Active", joinDate: "2024-01-15", avatar: "/members/alice.png", lastVisit: "2 hours ago" },
    { id: "m2", name: "Bob Smith", email: "bob@example.com", plan: "Gold Standard", status: "Active", joinDate: "2024-02-01", avatar: "/members/bob.png", lastVisit: "Yesterday" },
    { id: "m3", name: "Charlie Brown", email: "charlie@example.com", plan: "Silver Basic", status: "Expired", joinDate: "2023-11-20", avatar: "/members/bob.png", lastVisit: "30 days ago" },
    { id: "m4", name: "Diana Prince", email: "diana@example.com", plan: "Platinum Elite", status: "Active", joinDate: "2024-03-10", avatar: "/members/alice.png", lastVisit: "Today" },
    { id: "m5", name: "Evan Wright", email: "evan@example.com", plan: "Gold Standard", status: "Pending", joinDate: "2024-05-05", avatar: "/members/bob.png", lastVisit: "Never" },
    { id: "m6", name: "Fiona Gallagher", email: "fiona@example.com", plan: "Silver Basic", status: "Active", joinDate: "2024-02-28", avatar: "/members/alice.png", lastVisit: "3 days ago" },
];

export const MOCK_TRAINERS = [
    { id: "t1", name: "John Doe", specialty: "Strength & Conditioning", clients: 12, rating: 4.9, avatar: "/trainers/john-doe.png", status: "Available" },
    { id: "t2", name: "Jane Smith", specialty: "Yoga & Pilates", clients: 8, rating: 4.8, avatar: "/trainers/jane-smith.png", status: "Class in Session" },
    { id: "t3", name: "Mike Tyson", specialty: "Boxing", clients: 15, rating: 5.0, avatar: "/trainers/mike-tyson.png", status: "Available" },
    { id: "t4", name: "Sarah Connor", specialty: "CrossFit", clients: 10, rating: 4.7, avatar: "/trainers/sarah-connor.png", status: "On Leave" },
];

export const MOCK_INVENTORY = [
    { id: "inv1", name: "Whey Protein (Chocolate)", category: "Supplements", quantity: 45, price: 59.99, status: "In Stock", image: "/inventory/protein.png" },
    { id: "inv2", name: "Yoga Mats", category: "Equipment", quantity: 12, price: 29.99, status: "Low Stock", image: "/inventory/yoga-mat.png" },
    { id: "inv3", name: "Dumbbell Set (5-50lbs)", category: "Equipment", quantity: 2, price: 499.99, status: "In Stock", image: "/inventory/dumbbells.png" },
    { id: "inv4", name: "Pre-Workout (Blue Razz)", category: "Supplements", quantity: 0, price: 39.99, status: "Out of Stock", image: "/inventory/pre-workout.png" },
    { id: "inv5", name: "Treadmill Belts", category: "Maintenance", quantity: 5, price: 120.00, status: "In Stock", image: "/inventory/treadmill-belt.png" },
];

export const MOCK_FINANCE = [
    { id: "fin1", description: "Membership - Alice Johnson", type: "Income", category: "Membership", amount: 149.00, date: "2024-05-20", status: "Completed" },
    { id: "fin2", description: "New Treadmill Purchase", type: "Expense", category: "Equipment", amount: 2499.00, date: "2024-05-18", status: "Completed" },
    { id: "fin3", description: "Trainer Payout - John Doe", type: "Expense", category: "Payroll", amount: 1200.00, date: "2024-05-15", status: "Pending" },
    { id: "fin4", description: "Pro Shop Sales", type: "Income", category: "Retail", amount: 345.50, date: "2024-05-20", status: "Completed" },
    { id: "fin5", description: "Utility Bill - Electric", type: "Expense", category: "Utilities", amount: 450.00, date: "2024-05-10", status: "Completed" },
];
