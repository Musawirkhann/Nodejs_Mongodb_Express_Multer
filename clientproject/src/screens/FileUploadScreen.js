import React, {useState, useEffect} from 'react';
import {singleFileUpload, multipleFilesUpload} from '../data/api';
import {CircularProgressbar, buildStyles} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


const FileUploadScreen = (props) => {
    const [singleFile, setSingleFile] = useState('');
    const [multipleFiles, setMultipleFiles] = useState('');
    const [title, setTitle] =  useState('');
    const [singleProgress, setSingleProgress] = useState(0);
    const [multipleProgress, setMultipleProgress] = useState(0);

    const SingleFileChange = (e) => {
        setSingleFile(e.target.files[0]);
        setSingleProgress(0);
    }
    const MultipleFileChange = (e) => {
        setMultipleFiles(e.target.files);
        setMultipleProgress(0);
    }
    const singleFileOptions = {
        onUploadProgress: (progressEvent) => {
            const {loaded, total} = progressEvent;
            const percentage = Math.floor(((loaded / 1000) * 100) / (total / 1000));
            setSingleProgress(percentage);
        }
    }
    const mulitpleFileOptions = {
        onUploadProgress: (progressEvent) => {
            const {loaded, total} = progressEvent;
            const percentage = Math.floor(((loaded / 1000) * 100) / (total / 1000));
            setMultipleProgress(percentage);
        }
    }
    const uploadSingleFile = async () => {
        const formData = new FormData();
        formData.append('file', singleFile);
        await singleFileUpload(formData, singleFileOptions);
        props.getsingle();
    }
    const UploadMultipleFiles = async () => {
        const formData = new FormData();
        formData.append('title', title);
        for (let i = 0; i < multipleFiles.length; i++) {
            formData.append('files', multipleFiles[i]);                      
        }
        await multipleFilesUpload(formData, mulitpleFileOptions);
        props.getMultiple();
    }
    return (
        <div className="row mt-3">
            <div className="col-6">
                <div className="form-group">
                    <label>Select Single File</label>
                    <input type="file" className="form-control" onChange={(e) => SingleFileChange(e)} />
                </div>
                <div className="row">
                    <div className="col-10">
                        <button type="button" className="btn btn-danger" onClick={() => uploadSingleFile()} >Upload</button>
                    </div>
                    <div className="col-2">
                        <CircularProgressbar
                            value={singleProgress}
                            text={`${singleProgress}%`}
                            styles={buildStyles({
                                rotation: 0.25,
                                strokeLinecap: 'butt',
                                textSize: '16px',
                                pathTransitionDuration: 0.5,
                                pathColor: `rgba(255, 136, 136, ${singleProgress / 100})`,
                                textColor: '#f88',
                                trailColor: '#d6d6d6',
                                backgroundColor: '#3e98c7',
                            })}
                        />
                    </div>
                </div>
            </div>
            <div className="col-6">
                   <div className="row">
                       <div className="col-6">
                            <label >Title</label>
                            <input type="text" onChange={(e) => setTitle(e.target.value) } placeholder="enter title for your gallery" className="form-control"/>
                       </div>
                       <div className="col-6">
                        <div className="form-group">
                            <label>Select Multiple Files</label>
                            <input type="file" onChange={(e) => MultipleFileChange(e)} className="form-control" multiple />
                        </div>
                       </div>
                   </div>                   
                    <div className="row">
                        <div className="col-10">
                            <button type="button" onClick={() => UploadMultipleFiles()}  className="btn btn-danger">Upload</button>
                        </div>
                        <div className="col-2">
                        <CircularProgressbar
                            value={multipleProgress}
                            text={`${multipleProgress}%`}
                            styles={buildStyles({
                                rotation: 0.25,
                                strokeLinecap: 'butt',
                                textSize: '16px',
                                pathTransitionDuration: 0.5,
                                pathColor: `rgba(255, 136, 136, ${multipleProgress / 100})`,
                                textColor: '#f88',
                                trailColor: '#d6d6d6',
                                backgroundColor: '#3e98c7',
                            })}
                        />
                    </div>
                    </div>
                </div>
        </div>
    );
}

export default FileUploadScreen;