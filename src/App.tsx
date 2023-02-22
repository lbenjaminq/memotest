import { useEffect, useState } from "react";

const IMAGES = [
  "https://icongr.am/devicon/angularjs-original.svg?size=128&color=currentColor",
  "https://icongr.am/devicon/c-original.svg?size=128&color=currentColor",
  "https://icongr.am/devicon/atom-original.svg?size=128&color=currentColor",
  "https://icongr.am/devicon/css3-original.svg?size=128&color=currentColor",
  "https://icongr.am/devicon/django-original.svg?size=128&color=currentColor",
  "https://icongr.am/devicon/facebook-original.svg?size=128&color=currentColor",
  "https://icongr.am/devicon/firefox-original.svg?size=128&color=currentColor",
  "https://icongr.am/devicon/github-original.svg?size=128&color=currentColor",
].flatMap((image) => [`a|${image}`, `b|${image}`]).sort(() => Math.random() - 0.5);


function App() {

  const [match, setMatch] = useState<string[]>([]);
  const [selected, setSelected] = useState<string[]>(["a|https://icongr.am/devicon/github-original.svg?size=128&color=currentColor"]);

  useEffect(() => {
    if (selected.length == 2) {
      if (selected[0].split("|")[1] == selected[1].split("|")[1]) {
        setMatch((match) => match.concat(selected));
      }
      setTimeout(() => {
        setSelected([]);
      }, 1000);
    };
  }, [selected]);

  return (
    <main>
      <h2 style={{ textAlign: "center" }}>MEMOTEST</h2>
      <ul
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gridTemplateRows: "repeat(4, 1fr)",
          gap: "24px",
        }}
      >
        {
          IMAGES.map((image) => {
            const [, url] = image.split("|")
            return (
              <li
                key={image}
                onClick={() => selected.length < 2 && setSelected((selected) => selected.concat(image))}
                style={{ border: "1px solid #555", borderRadius: "10px", padding: "20px" }}
              >
                {
                  selected.includes(image) || match.includes(image) ?
                    <img src={url} />
                    :
                    <img src={"https://icongr.am/entypo/flash.svg?size=128&color=currentColor"} />
                }
              </li>
            )
          })
        }
      </ul>
      {
        match.length === IMAGES.length &&
        <div style={{ textAlign: "center" }}>
          <h2>Congratulations</h2>
          <button onClick={() => {
            setMatch([]);
            setSelected(["a|https://icongr.am/devicon/github-original.svg?size=128&color=currentColor"]);
          }} >Play Again</button>
        </div>
      }
    </main>
  )
}

export default App;
