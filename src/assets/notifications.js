import BlankUser from "./kafkanauts_175x175.png"

export default [
    {
        "id": 1,
        "read": false,
        "image": BlankUser,
        "sender": "Cluster 1",
        "time": "a few moments ago",
        "link": "#",
        "message": `Health report normal`
    },
    {
        "id": 2,
        "read": false,
        "image": BlankUser,
        "sender": "Warning",
        "time": "2 hrs ago",
        "link": "#",
        "message": `Underreplicated partition detected in broker.`
    },
    {
        "id": 3,
        "read": false,
        "image": BlankUser,
        "sender": "Network Latency",
        "time": "5 hrs ago",
        "link": "#",
        "message": `No abnormalities detected in network latency.`
    },
    {
        "id": 4,
        "read": true,
        "image": BlankUser,
        "sender": "admin",
        "time": "1 day ago",
        "link": "#",
        "message": `Login detected`
    },
    {
        "id": 5,
        "read": true,
        "image": BlankUser,
        "sender": "Cluster created",
        "time": "2 days ago",
        "link": "#",
        "message": `New message: "Cluster initialized."`
    },
]