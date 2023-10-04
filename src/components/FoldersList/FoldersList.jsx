import { useState } from "react";
import "./FoldersList.scss";

export default function FoldersList({
  folders,
  setFolders,
  setSelectedFolder,
}) {
  const [isCreatingFolder, setIsCreatingFolder] = useState(false);
  const [folderName, setFolderName] = useState("");

  function createNewFolder() {
    folderName.toLowerCase();
    if (folderName && !folders.includes(folderName)) {
      const updatedFolders = [...folders, folderName];
      localStorage.setItem("folders", JSON.stringify(updatedFolders));
      setFolders(updatedFolders);
      setIsCreatingFolder(false);
      setFolderName("");
    } else {
      // TODO: Use toast alert.
      alert("Folder name is empty or already exists!");
    }
  }

  return (
    <div className="FoldersList">
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
        <div onClick={() => setSelectedFolder(null)}>
          <p>All Notes</p>
        </div>
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
