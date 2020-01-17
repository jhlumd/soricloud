import React from 'react';

export default function DetailsForm(props) {
  const {
    title,
    privacy,
    description,
    audioFile,
    photoUrl,
    imageErrors,
    titleErrors
  } = props.allInfo;
  const {
    handlePhotoFile,
    handleSubmit,
    handleChange,
    handlePrivacy,
    handleCancel
  } = props;

  const showImageErrors =
    imageErrors.length > 0
      ? imageErrors.map((error, i) => {
          return (
            <li id="errors2" key={`${i}`}>
              {error}
            </li>
          );
        })
      : null;
  
  const showTitleErrors =
    titleErrors.length > 0
      ? titleErrors.map((error, i) => {
          return (
            <li id="errors2" key={`${i}`}>
              {error}
            </li>
          );
        })
      : null;

  return (
    <>
      <div className="file-name">
        <div>{audioFile.name}</div>
        <div>Ready. Click Save to post this track.</div>
      </div>
      <div className="border blue"></div>
      <div className="border orange"></div>
      <div className="track-form-final-container">
        <div className="upload-form-tabs">
          <button className="basic-info-tab">Basic Info</button>
        </div>

        <div className="upload-form-innards">
          <div className="track-errors">
            <div className="track-image-container">
              <img className="track-image" src={photoUrl} />
              <div className="image-edit-button">
                <label htmlFor="files">
                  <div className="inside">
                    <img src={window.cameraIcon} />
                    <p>Upload image</p>
                    <input id="files" type="file" onChange={handlePhotoFile} />
                  </div>
                </label>
              </div>
            </div>
            {showImageErrors}
          </div>

          <div className="upload-form-innards-form">
            <form id="track-form" onSubmit={handleSubmit}>
              <label>
                Title <span className="red-splat">*</span>
                <br />
                <input
                  className="track-title-input"
                  type="text"
                  value={title}
                  onChange={handleChange("title")}
                />
              </label>
              {showTitleErrors}
              <label>
                <h4 className="description">Description</h4>
                <br />
                <textarea
                  className="track-title-input description-input"
                  type="textarea"
                  value={description}
                  onChange={handleChange("description")}
                  placeholder="Describe your track"
                />
              </label>
              <br />
              Privacy:
              <br />
              <br />
              <input
                type="radio"
                name="false"
                checked={privacy ? "" : "checked"}
                onChange={handlePrivacy}
              />{" "}
              <label htmlFor="public">
                <span className="public">Public</span>
              </label>
              <br />
              <br />
              <input
                type="radio"
                name="true"
                checked={privacy ? "checked" : ""}
                onChange={handlePrivacy}
              />{" "}
              <label htmlFor="private">
                <span className="public">Private</span>
              </label>
            </form>
          </div>
        </div>
      </div>
      <div className="save-track-container">
        <div>
          <span className="red-splat">*</span>Required fields
        </div>
        <button className="save-track" onClick={handleCancel}>
          Cancel
        </button>
        <button form="track-form" className="save-track">
          Save
        </button>
      </div>
    </>
  );
}
