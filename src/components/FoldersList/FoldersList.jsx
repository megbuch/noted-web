import { useState } from "react";
import { MdNotes, MdCreate, MdCheck, MdOutlineArrowBack } from "react-icons/md";
import "./FoldersList.scss";

export default function FoldersList({
  folders,
  setFolders,
  selectedFolder,
  setSelectedFolder,
  createNewNote,
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

  function getFolderClassName(folder) {
    if (selectedFolder === folder) return "folder active";
    return "folder";
  }

  // TODO: Need a back icon on create a folder. So a user can go back to not creating one.
  return (
    <div className="FoldersList">
      <div className="create-new-note" onClick={createNewNote}>
        <MdCreate />
        <p>Create New Note</p>
      </div>
      {isCreatingFolder ? (
        <div className="enter-folder-name">
          <div className="icon" onClick={() => setIsCreatingFolder(false)}>
            <MdOutlineArrowBack />
          </div>
          <input
            type="text"
            placeholder="Enter a folder name"
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
          />
          <div className="icon" onClick={createNewFolder}>
            <MdCheck />
          </div>
        </div>
      ) : (
        <div
          className="create-new-folder"
          onClick={() => setIsCreatingFolder(true)}
        >
          <MdNotes />
          <p>Create New Folder</p>
        </div>
      )}
      <div className="folders">
        <div
          className={selectedFolder === null ? "folder active" : "folder"}
          onClick={() => setSelectedFolder(null)}
        >
          <p>All Notes</p>
        </div>
        {folders.sort().map((folder, index) => (
          <div
            className={getFolderClassName(folder)}
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
