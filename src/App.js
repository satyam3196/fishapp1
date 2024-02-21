import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
import './App.css';

function App() {
  const articleOptions = [
    { value: 'Article A', label: 'Article A' },
    { value: 'Article A.1', label: 'Article A.1' },
    { value: 'Article A.1.1 (a)', label: 'Article A.1.1 (a)' },
    { value: 'Article A.1.1 (b)', label: 'Article A.1.1 (b)' },
    { value: 'Article A.1.1 (c)', label: 'Article A.1.1 (c)' },
    { value: 'Article A.1.2', label: 'Article A.1.2' },
    { value: 'Article A.2', label: 'Article A.2' },
    { value: 'Article B', label: 'Article B' },
    { value: 'Article B.1', label: 'Article B.1' },
    { value: 'Article B.2', label: 'Article B.2' },
    { value: 'Article B.3', label: 'Article B.3' },
    { value: 'Article B.4', label: 'Article B.4' },
    { value: 'Article B.5', label: 'Article B.5' },
    { value: 'Article C', label: 'Article C' },
    { value: 'Article C.1', label: 'Article C.1' },
    { value: 'Article C.2', label: 'Article C.2' },
    { value: 'Article C.3', label: 'Article C.3' },
    { value: 'Article C.4', label: 'Article C.4' },
    { value: 'Article C.5', label: 'Article C.5' },
    { value: 'Article C.6', label: 'Article C.6' },
    { value: 'Article C.7', label: 'Article C.7' },
    { value: 'Article D', label: 'Article D' },
    { value: 'Article D.1', label: 'Article D.1' },
    { value: 'Article D.2', label: 'Article D.2' },
    { value: 'Article E', label: 'Article E' },
    { value: 'Article E.1', label: 'Article E.1' },
    { value: 'Article E.2', label: 'Article E.2' },
  ];

  const [selectedArticle, setSelectedArticle] = useState(null);
  const [articleDetails, setArticleDetails] = useState({ description: '', inference: '' });

  const handleArticleChange = selectedOption => {
    setSelectedArticle(selectedOption);
    axios.get(`/.netlify/functions/excelHandler`, {
      params: { article: selectedOption.value }
    })
    .then(response => {
      const data = response.data; // Directly use the response data
      setArticleDetails({
        description: data.Description || 'No description found',
        inference: data.Implications || 'No inference found'
      });
    })
    .catch(error => {
      console.error('Error fetching article details:', error);
      setArticleDetails({ description: 'Error fetching details', inference: '' });
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>FishSubsidyFusion</h1>
        <p className="App-description">"FishSubsidyFusion" revolutionizes the negotiation landscape at the 13th Ministerial Conference on the Agreement on Fisheries Subsidies (WT/MIN/(24)/10) in real time. Dive into the depths of the latest fisheries text issued online, with a single tap and unlock bespoke interpretations tailored specifically to the interests of developing countries in particular small vulnerable economies and LDCs. This dynamic app ensures you're always steps ahead in negotiations, providing timely insights and analysis at the swipe of a screen. Stay informed, stay empowered—let "FishSubsidyFusion" be your secret weapon in achieving a balanced outcome this MC 13. <p><b>Note: All views expressed in the analysis of the document are of the authors and not of any persons or organizations.</b></p></p>
        <div class="fish">
  <div class="fish-body">
    <div class="eye">
      <div class="pupil"></div>
    </div>
  </div>
  <div class="fin"></div>
  <div class="fin fin-bottom"></div>
</div>

<div class="bubbles bubble-1"></div>
<div class="bubbles bubble-5"></div>
<div class="bubbles bubble-2"></div>
<div class="bubbles bubble-6"></div>
<div class="bubbles bubble-3"></div>
<div class="bubbles bubble-7"></div>
<div class="bubbles bubble-4"></div>
<div class="bubbles bubble-8"></div>      
        <div className="article-selection">
          <Select
            value={selectedArticle}
            onChange={handleArticleChange}
            options={articleOptions}
            placeholder="Select an article"
            className="article-dropdown"
          />
        </div>
        <div className="content-section">
          <div className="detail-box-container">
            <label><b><u>Description</u></b></label>
            <div className="detail-box">
              <p>{articleDetails.description}</p>
            </div>
          </div>
          <div className="detail-box-container">
            <label><b><u>Implications</u></b></label>
            <div className="detail-box">
              <p>{articleDetails.inference}</p>
            </div>
          </div>
          
  
        </div>
      </header>
    </div>
  );
}

export default App;