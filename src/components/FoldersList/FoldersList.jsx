import { useState } from "react";

export default function FoldersList({
  folders,
  setFolders,
  setSelectedFolder,
}) {
  const [isCreatingFolder, setIsCreatingFolder] = useState(false);
  const [folderName, setFolderName] = useState("");

  function createNewFolder() {
    if (folderName && !folders.includes(folderName)) {
      setFolders((prevFolders) => [...prevFolders, folderName]);
      setIsCreatingFolder(false);
      setFolderName("");
    } else {
      // TODO: Use toast alert.
      alert("Folder name is empty or already exists!");
    }
  }

  return (
    <div className="FoldersList">
      <h1>Folders</h1>
      {isCreatingFolder ? (
        <div>
          <input
            type="text"
            placeholder="Enter a folder name"
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
          />
          <button onClick={createNewFolder}>Confirm</button>
        </div>
      ) : (
        <button onClick={() => setIsCreatingFolder(true)}>Create Folder</button>
      )}
      <div className="folders">
        {folders.map((folder, index) => (
          <div
            className="folder"
            key={index}
            onClick={() => setSelectedFolder(folder)}
          >
            <p>{folder}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
