import picture1 from '../img/4A790162.jpg'
import picture2 from '../img/monolock.png'
import picture3 from '../img/raspberry.png'
import Bar from '../component/Navbar'
import { useState } from 'react';

import './Homepage.css';

function Homepage() {
  const [a, setA] = useState(false);
  return (
    <div>
      <Bar setA={setA} a={a}/>
      <div id="resume">
        <div className="basic">
          <div className="left">
            <p className="name">邱柏翰</p>
            <p className="content">
              <img
                className="img"
                alt=""
                src="https://www.svgrepo.com/show/349475/phone.svg"
              />0963808310
            </p>
            <p className="content">
              <a href="https://github.com/bohan1109">
                <img
                  className="img"
                  alt=""
                  src="https://www.svgrepo.com/show/341847/github.svg"
                  href="https://github.com/bohan1109" />bohan1109
              </a>
            </p>
            <p className="content">
              <img
                className="img"
                src="https://www.svgrepo.com/show/243092/gmail.svg"
                alt=""
              />qazwsx147866@gmail.com
            </p>
          </div>

          <img
            src={picture1}
            alt=""
            className="mt-5"
            style=
            {{
              width: '120px',
              height: '150px',
              border: '1px solid rgb(215, 215, 216)'
            }}

          />
        </div>
        <hr className="hr" />
        <div className="summary">
          <p className="title">簡歷 Summary</p>
          <p className="content">
            就讀於南台科技大學資訊管理系，目前在創科資訊股份有限公司培訓，培訓時常接觸到共同開發，以及技術分享，因此在培訓中我非常享受團隊互相合作、
            共同前進的感覺，並且可以在分享會中學到每個人分享的內容，培訓內容也非常廣，因此工作並不只侷限在單一的領域中，可以吸收更多不一樣的經驗，
            更是在培訓中找到對工作的熱情。
          </p>
        </div>
        <hr className="hr" />
        <div className="work_experience overflow-hidden">
          <p className="title">工作經驗 Professional Experience</p>
          <div className="flex justify-between items-center">

            <p className="content_work">創科資訊股份有限公司培訓</p>


            <p className="content_time">2022/02-now</p>

          </div>
          <p className="content">
            在大四下時，到創科資訊股份有限公司培訓進行培訓，在這邊學習許多技能，從設計、前端、後端、測試、部屬都有學到，對專案的流程及執行有了更進一步的了解，
            在實習時有許多實作機會，可以讓我們進行團隊專案的製作，在團隊專案製作中，除了學到許多沒用過的技術，像是Laravel、React、Git、虛擬環境等等，
            還學到了與團隊成員溝通的技巧，因為與不同的人分組合作，有同樣為資管系的台中科技大學的幾位、逢甲大學資工系的、雲科大資管系還有嘉義大學數位設計與管理學系的同學，
            養成了與不同的人合作時的溝通能力，在團隊中我是比較屬於接受並執行任務的角色，並且在討論時提出自己意見，且在遇到問題時會提出與組員溝通，
            並且會關心組員是否需要幫忙或是進度如何，在專案執行時與負責不同職務的人做交流、討論，可以在實際製作時減少許多可能會遇到的問題。
          </p>
        </div>

        <hr className="hr" />
        <div className="skill">
          <p className="title">專業技能 Skills</p>
          <div className="skillgird">
            <div className="skilldiv">
              <img
                className="img"
                src="https://www.svgrepo.com/show/349402/html5.svg"
                alt=""
              />
              <p className="skilltitle">Html5</p>
              <hr />
              <li>Html</li>
              <li>Css</li>
            </div>
            <div className="skilldiv">
              <img
                className="img"
                src="https://www.svgrepo.com/show/349419/javascript.svg"
                alt=""
              />
              <p className="skilltitle">Javascript</p>
              <hr />
              <li>Javascript</li>
              <li>Vue.js</li>
              <li>Node.js</li>
              <li>Jquery</li>
              <li>Ajax</li>
            </div>
            <div className="skilldiv">
              <img
                className="img"
                src="https://www.svgrepo.com/show/374016/python.svg"
                alt=""
              />
              <p className="skilltitle">Python</p>
              <hr />
              <li>Python</li>
              <li>Flask</li>
            </div>
            <div className="skilldiv">
              <img className="img" src="https://www.svgrepo.com/show/354180/php.svg" alt="" />
              <p className="skilltitle">Php</p>
              <hr />
              <li>Php</li>
              <li>Laravel</li>
            </div>
            <div className="skilldiv">
              <img
                className="img"
                alt=""
                src="https://www.svgrepo.com/show/42243/database.svg"
              />
              <p className="skilltitle">Database</p>
              <hr />
              <li>Mysql</li>
              <li>Postgresql</li>
              <li>Sql Server</li>
            </div>
            <div className="skilldiv">
              <img className="img" src="https://www.svgrepo.com/show/373623/git.svg" alt="" />
              <p className="skilltitle">Git</p>
              <hr />
              <li>Git</li>
              <li>Github</li>
              <li>Markdown</li>
            </div>
          </div>
        </div>
        <hr className="hr" />
        <div className="Certificates">
          <p className="title">證照 Certificates</p>
          <div className="Cergrid">
            <li>電腦軟體應用丙級</li>
            <li>電腦軟體應用乙級</li>
            <li>會計事務-資訊丙級</li>
            <li>TQC電子商業概論專業級</li>
            <li>企業電子化助理規畫師合格證書</li>
            <li>TQC網頁編輯製作</li>
            <li>TQC影像編輯製作</li>
            <li>企業電子化人才能力鑑定單科合格證書</li>
            <li>Planner Of Enterprise Resource Planning</li>
          </div>
        </div>
        <hr className="hr" />
        <div className="project">
          <p className="title">專案與作品集 Portfolio</p>
          <div className="projectdiv">
            <div className="basic">
              <div className="left">
                <p className="projectname">Monospace鎖櫃系統</p>
                <p className="projectcontent">
                  公司新進鎖櫃，為了決定鎖櫃使用者，鎖櫃使用者需要輸入志願並抽籤，因此我們製作了鎖櫃系統，此系統前端使用了react.js後端使用了laravel，
                  我負責的部分是後端api製作、前後端串接、heroku架設的部分。
                </p>
              </div>
              <div className="picture">
                <img src={picture2} alt="" className="pricture" />
              </div>
            </div>
            <div className="basic">
              <div className="left">
                <p className="projectname">即時溫溼度感測</p>
                <p className="projectcontent">
                  這個專案是做溫溼度感測，並將資料即時存進資料庫，並將資料庫內容抓出來，將資料顯示在網頁上，讓觀測人員可以使用透過網頁的圖表，
                  隨時知道現在的溫溼度如何，我負責的部分是mqtt broker的架設、python
                  flask的api製作，包含資料庫連線、表格製作、新增、搜尋等功能。
                </p>
              </div>

              <img src={picture3} alt="" className="picture" />
            </div>
          </div>
        </div>
        <hr className="hr" />
        <div className="education">
          <p className="title">學歷 Education</p>
          <div className="flex justify-between items-center">

            <p className="content_work">南台科技大學</p>

            <p className="content_time">2018/09-2022/06</p>

          </div>
          <p className="content">資訊管理系</p>
        </div>
        <hr className="hr" />
        <div className="language">
          <p className="title">語言能力 Language</p>
          <p className="content">中文(母語)<br />英文(初學)</p>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
