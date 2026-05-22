import express from 'express';

const app = express();
const PORT = 3001;

app.use(express.json());

let notes = [];

/* =========================
   HOME PAGE
========================= */
app.get('/', (req, res) => {

  const totalNotes = notes.length;

  res.send(`
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Notes API</title>

    <style>
      *{
        margin:0;
        padding:0;
        box-sizing:border-box;
        font-family:Arial, sans-serif;
      }

      body{
        background: linear-gradient(135deg,#141e30,#243b55);
        color:white;
        min-height:100vh;
        display:flex;
        justify-content:center;
        align-items:center;
        padding:30px;
      }

      .container{
        width:100%;
        max-width:900px;
        background:rgba(255,255,255,0.1);
        backdrop-filter: blur(10px);
        border-radius:20px;
        padding:40px;
        box-shadow:0 10px 30px rgba(0,0,0,0.3);
      }

      h1{
        font-size:42px;
        margin-bottom:10px;
        text-align:center;
      }

      .subtitle{
        text-align:center;
        color:#ddd;
        margin-bottom:30px;
      }

      .stats{
        background:#ffffff15;
        padding:20px;
        border-radius:15px;
        margin-bottom:30px;
        text-align:center;
      }

      .stats h2{
        font-size:32px;
        color:#00ffcc;
      }

      .routes{
        display:grid;
        grid-template-columns:1fr 1fr;
        gap:20px;
      }

      .card{
        background:#ffffff10;
        padding:20px;
        border-radius:15px;
        transition:0.3s;
        border:1px solid rgba(255,255,255,0.1);
      }

      .card:hover{
        transform:translateY(-5px);
        background:#ffffff20;
      }

      .method{
        font-size:14px;
        font-weight:bold;
        padding:6px 12px;
        border-radius:20px;
        display:inline-block;
        margin-bottom:10px;
      }

      .get{
        background:#00c853;
      }

      .post{
        background:#2962ff;
      }

      .put{
        background:#ff9800;
      }

      .delete{
        background:#ff1744;
      }

      code{
        color:#00ffcc;
        font-size:15px;
      }

      footer{
        margin-top:30px;
        text-align:center;
        color:#ccc;
      }

      @media(max-width:700px){
        .routes{
          grid-template-columns:1fr;
        }
      }

    </style>
  </head>

  <body>

    <div class="container">

      <h1>📝 Notes API Server</h1>

      <p class="subtitle">
        Build, Create, Update and Delete Notes using REST API 🚀
      </p>

      <div class="stats">
        <p>Total Notes</p>
        <h2>${totalNotes}</h2>
      </div>

      <div class="routes">

        <div class="card">
          <span class="method get">GET</span>
          <h3>Get All Notes</h3>
          <p><code>/notes</code></p>
        </div>

        <div class="card">
          <span class="method get">GET</span>
          <h3>Get Single Note</h3>
          <p><code>/notes/:id</code></p>
        </div>

        <div class="card">
          <span class="method post">POST</span>
          <h3>Create Note</h3>
          <p><code>/notes</code></p>
        </div>

        <div class="card">
          <span class="method put">PUT</span>
          <h3>Update Note</h3>
          <p><code>/notes/:id</code></p>
        </div>

        <div class="card">
          <span class="method delete">DELETE</span>
          <h3>Delete Note</h3>
          <p><code>/notes/:id</code></p>
        </div>

      </div>

      <footer>
        Made with ❤️ using Node.js + Express by MOHIT
      </footer>

    </div>

  </body>
  </html>
  `);
});


/* =========================
   GET ALL NOTES
========================= */
app.get('/notes', (req, res) => {

  res.status(200).json({
    success: true,
    total: notes.length,
    message: "All notes fetched successfully",
    data: notes
  });

});


/* =========================
   ADD NOTE
========================= */
app.post('/notes', (req, res) => {

  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({
      success: false,
      message: "Title and Content are required"
    });
  }

  const newNote = {
    id: notes.length + 1,
    title,
    content,
    createdAt: new Date()
  };

  notes.push(newNote);

  res.status(201).json({
    success: true,
    message: "Note added successfully ✅",
    data: newNote
  });

});


/* =========================
   GET NOTE BY ID
========================= */
app.get('/notes/:id', (req, res) => {

  const note = notes.find(
    n => n.id === parseInt(req.params.id)
  );

  if (!note) {
    return res.status(404).json({
      success: false,
      message: "Note not found ❌"
    });
  }

  res.status(200).json({
    success: true,
    data: note
  });

});


/* =========================
   UPDATE NOTE
========================= */
app.put('/notes/:id', (req, res) => {

  const note = notes.find(
    n => n.id === parseInt(req.params.id)
  );

  if (!note) {
    return res.status(404).json({
      success: false,
      message: "Note not found ❌"
    });
  }

  const { title, content } = req.body;

  note.title = title || note.title;
  note.content = content || note.content;

  res.status(200).json({
    success: true,
    message: "Note updated successfully ✅",
    data: note
  });

});


/* =========================
   DELETE NOTE
========================= */
app.delete('/notes/:id', (req, res) => {

  const noteIndex = notes.findIndex(
    n => n.id === parseInt(req.params.id)
  );

  if (noteIndex === -1) {
    return res.status(404).json({
      success: false,
      message: "Note not found ❌"
    });
  }

  const deletedNote = notes.splice(noteIndex, 1);

  res.status(200).json({
    success: true,
    message: "Note deleted successfully 🗑️",
    data: deletedNote
  });

});


/* =========================
   SERVER
========================= */
app.listen(PORT, () => {
  console.log(`The server is running on http://localhost:${PORT}`);
});
