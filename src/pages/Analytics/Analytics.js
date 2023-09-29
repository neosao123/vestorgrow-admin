import React from "react";
import { Link } from "react-router-dom";
import DemographicChart from "./DemographicChart";
import LineCharts from "./LineCharts";
import PieCharts from "./PieCharts";
import TopBrowsersChart from "./TopBrowsersChart";
import TopCitiesChart from "./TopCitiesChart";
import TopCountriesChart from "./TopCountriesChart";
import TrafficSourcesChart from "./TrafficSourcesChart";
import TypeOFUsersChart from "./TypeOFUsersChart";
import UserSessionChart from "./UserSessionChart";
import UsersOnlineChart from "./UsersOnlineChart";

function Analytics() {
  
  return (
    <div className="ljSectionData ljAnalyticsData w-100 clearfix" id="ljAnalyticsData">
          <div className="allCardList">
            <div className="row">
              <div className="col-xl-3 col-md-4 col-6 pb-4">
                <div className="FullViews card">
                  <Link to="#" className="d-flex">
                    <h6 className="m-0">USERS ONLINE</h6>
                    <h3 className="m-0">8,720</h3>
                  </Link>
                </div>
              </div>
              <div className="col-xl-3 col-md-4 col-6 pb-4">
                <div className="FullViews card">
                  <Link to="#" className="d-flex">
                    <h6 className="m-0">NEW USERS</h6>
                    <h3 className="m-0">299,890</h3>
                  </Link>
                </div>
              </div>
              <div className="col-xl-3 col-md-4 col-6 pb-4">
                <div className="FullViews card">
                  <Link to="#" className="d-flex">
                    <h6 className="m-0">SESSIONS</h6>
                    <h3 className="m-0">299,890</h3>
                  </Link>
                </div>
              </div>
              <div className="col-xl-3 col-md-4 col-6 pb-4">
                <div className="FullViews card">
                  <Link to="#" className="d-flex">
                    <h6 className="m-0">NUMBERS OF SESSIONS <br className="d-none d-md-block"/>PER USER</h6>
                    <h3 className="m-0">299,890</h3>
                  </Link>
                </div>
              </div>
              <div className="col-xl-3 col-md-4 col-6 pb-4">
                <div className="FullViews card">
                  <Link to="#" className="d-flex">
                    <h6 className="m-0">PAGEVIEWS</h6>
                    <h3 className="m-0">299,890</h3>
                  </Link>
                </div>
              </div>
              <div className="col-xl-3 col-md-4 col-6 pb-4">
                <div className="FullViews card">
                  <Link to="#" className="d-flex">
                    <h6 className="m-0">PAGES / SESSION</h6>
                    <h3 className="m-0">299,890</h3>
                  </Link>
                </div>
              </div>
              <div className="col-xl-3 col-md-4 col-6 pb-4">
                <div className="FullViews card">
                  <Link to="#" className="d-flex">
                    <h6 className="m-0">AVERAGE SESSION DURATION</h6>
                    <h3 className="m-0">299,890</h3>
                  </Link>
                </div>
              </div>
              <div className="col-xl-3 col-md-4 col-6 pb-4">
                <div className="FullViews card">
                  <Link to="#" className="d-flex">
                    <h6 className="m-0">BOUNCE RATE</h6>
                    <h3 className="m-0">299,890</h3>
                  </Link>
                </div>
              </div>
              <div className="col-xl-6 col-12 pb-4">
                <div className="FullViews card">
                  <div className="cardTitles p-3 d-flex align-items-center justify-content-between">
                    <div>
                      <h5 className="m-0">Users</h5>
                      <p className="m-0">This week vs Last week</p>
                    </div>
                    <div>
                      <ul className="list-unstyled IndiLists m-0">
                        <li><span className="point9"></span> This Week</li>
                        <li><span className="point2"></span> Last Week</li>
                      </ul>
                    </div>
                  </div>
                  <div className="ljpChartInsides">
                    <div className="ljpGraphChartOne position-relative">
                      <div id="ljpAllUsers">
                        <LineCharts />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-sm-6 col-12 pb-4">
                <div className="FullViews card">
                  <div className="cardTitles p-3">
                    <div>
                      <h5 className="m-0">Users</h5>
                      <p className="m-0">By Gender</p>
                    </div>
                  </div>
                  <div className="ljpChartInsides">
                    <div className="ljpGraphChartTwo position-relative">
                      <div id="ljpUsersGender"><PieCharts /></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-sm-6 col-12 pb-4">
                <div className="FullViews card h-100">
                  <div className="cardTitles p-3">
                    <div>
                      <h5 className="m-0">Users</h5>
                      <p className="m-0">By Age</p>
                    </div>
                  </div>
                  <div className="ProgressBarChart h-100 p-3">
                    <div className="progress">
                      <div className="progress-bar clr1" style={{width:'80%'}}>15 -24</div>
                    </div>
                    <div className="progress">
                      <div className="progress-bar clr2" style={{width:'70%'}}>25 -34</div>
                    </div>
                    <div className="progress">
                      <div className="progress-bar clr3" style={{width:'60%'}}>35 -44</div>
                    </div>
                    <div className="progress">
                      <div className="progress-bar clr4" style={{width:'50%'}}>45 -54</div>
                    </div>
                    <div className="progress">
                      <div className="progress-bar clr5" style={{width:'40%'}}>55 -64</div>
                    </div>
                    <div className="progress">
                      <div className="progress-bar clr6" style={{width:'30%'}}>65+</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-sm-6 col-12 pb-4">
                <div className="topDevices">
                  <div className="FullViews card">
                    <div className="cardTitles p-3">
                      <div>
                        <h5 className="m-0">Top Device</h5>
                        <p className="m-0">By Sessions</p>
                      </div>
                    </div>
                    <div className="ProgressBarChart h-100 px-3 pb-3">
                      <div className="progress">
                        <div className="progress-bar clr1" style={{width:'80%'}}>DESKTOP</div>
                      </div>
                      <div className="progress">
                        <div className="progress-bar clr2" style={{width:'70%'}}>Mobile</div>
                      </div>
                    </div>
                  </div>
                  <div className="FullViews card">
                    <div className="cardTitles p-3">
                      <div>
                        <h5 className="m-0">Top Mobile OS </h5>
                        <p className="m-0">By Sessions</p>
                      </div>
                    </div>
                    <div className="ProgressBarChart h-100 px-3 pb-3">
                      <div className="progress">
                        <div className="progress-bar clr1" style={{width:'70%'}}>DESKTOP</div>
                      </div>
                      <div className="progress">
                        <div className="progress-bar clr2" style={{width:'50%'}}>Mobile</div>
                      </div>
                      <div className="progress">
                        <div className="progress-bar clr4" style={{width:'50%'}}>Other</div>
                      </div>
                    </div>
                  </div>
                  <div className="FullViews card">
                    <div className="cardTitles p-3">
                      <div>
                        <h5 className="m-0">Top Desktop OS</h5>
                        <p className="m-0">By Sessions</p>
                      </div>
                    </div>
                    <div className="ProgressBarChart h-100 px-3 pb-3">
                      <div className="progress">
                        <div className="progress-bar clr1" style={{width:'80%'}}>Windows</div>
                      </div>
                      <div className="progress">
                        <div className="progress-bar clr2" style={{width:'70%'}}>Mac OS</div>
                      </div>
                      <div className="progress">
                        <div className="progress-bar clr3" style={{width:'70%'}}>LINUX</div>
                      </div>
                      <div className="progress">
                        <div className="progress-bar clr4" style={{width:'70%'}}>Others</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-sm-6 col-12 pb-4">
                <div className="topDevices topDeviceOne">
                  <div className="FullViews card">
                    <div className="cardTitles p-3">
                      <div>
                        <h5 className="m-0">Users Online</h5>
                        <p className="m-0">Last 7 days, daily</p>
                      </div>
                    </div>
                    <div className="ljpChartInsides">
                      <div className="ljpGraphChartThree position-relative">
                        <div id="ljpUserOline"><UsersOnlineChart /></div>
                      </div>
                    </div>
                  </div>
                  <div className="FullViews card">
                    <div className="cardTitles p-3">
                      <div>
                        <h5 className="m-0">Types of Users</h5>
                        <p className="m-0">By Sessions</p>
                      </div>
                    </div>
                    <div className="indicatorLists px-3">
                      <ul className="list-unstyled IndiLists">
                        <li><span className="point5"></span> Returning</li>
                        <li><span className="point2"></span> New</li>
                      </ul>
                    </div>
                    <div className="ljpChartInsides">
                      <div className="ljpGraphChartFour position-relative">
                        <div id="ljpTypeOFUsers"><TypeOFUsersChart /></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-sm-6 col-12 pb-4">
                <div className="topDevices topDeviceTwo">
                  <div className="FullViews card">
                    <div className="cardTitles p-3">
                      <div>
                        <h5 className="m-0">Sessions</h5>
                        <p className="m-0">Last 7 days, daily</p>
                      </div>
                    </div>
                    <div className="ljpChartInsides">
                      <div className="ljpGraphChartThree position-relative">
                        <div id="ljpUserSessions"><UserSessionChart /></div>
                      </div>
                    </div>
                  </div>
                  <div className="FullViews card">
                    <div className="cardTitles p-3">
                      <div>
                        <h5 className="m-0">Traffic Sources</h5>
                        <p className="m-0">By Sessions</p>
                      </div>
                    </div>
                    <div className="indicatorLists px-3">
                      <ul className="list-unstyled IndiLists">
                        <li><span className="point1"></span> Google</li>
                        <li><span className="point5"></span> Reddit</li>
                        <li><span className="point2"></span> Twitter</li>
                        <li><span className="point6"></span> Yahoo</li>
                        <li><span className="point3"></span> Discord</li>
                        <li><span className="point7"></span> Youtube</li>
                        <li><span className="point4"></span> Quora</li>
                        <li><span className="point10"></span> Others</li>
                      </ul>
                    </div>
                    <div className="ljpChartInsides">
                      <div className="ljpGraphChartFive position-relative">
                        <div id="ljpTrafficSources"><TrafficSourcesChart /></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-sm-6 col-12 pb-4">
                <div className="topDevices topDeviceThree">
                  <div className="FullViews card">
                    <div className="cardTitles p-3">
                      <div>
                        <h5 className="m-0">Demographic</h5>
                        <p className="m-0">Last 7 days, daily</p>
                      </div>
                    </div>
                    <div className="ljpChartInsides">
                      <div className="ljpGraphChartThree position-relative">
                        <div id="ljpDemographic"><DemographicChart /></div>
                      </div>
                    </div>
                  </div>
                  <div className="FullViews card">
                    <div className="cardTitles p-3">
                      <div>
                        <h5 className="m-0">Top Browsers</h5>
                        <p className="m-0">By Sessions</p>
                      </div>
                    </div>
                    <div className="indicatorLists px-3">
                      <ul className="list-unstyled IndiLists">
                        <li><span className="point1"></span> Chrome</li>
                        <li><span className="point5"></span> Brave</li>
                        <li><span className="point2"></span> Safari</li>
                        <li><span className="point6"></span> Tor</li>
                        <li><span className="point3"></span> Firefox</li>
                        <li></li>
                        <li><span className="point4"></span>Opera</li>
                      </ul>
                    </div>
                    <div className="ljpChartInsides">
                      <div className="ljpGraphChartSix position-relative">
                        <div id="ljpTopBrowsers"><TopBrowsersChart /></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-12 pb-4">
                <div className="FullViews card fullAllCards">
                  <div className="row m-0">
                    <div className="col-xl-5 p-0">
                      <div className="cardTitles p-3">
                        <div>
                          <h5 className="m-0">Top Countries</h5>
                          <p className="m-0">By Sessions</p>
                        </div>
                      </div>
                      <div className="indicatorLists px-3">
                        <ul className="list-unstyled IndiLists">
                          <li><span className="point1"></span> Contry 1</li>
                          <li><span className="point2"></span> Contry 2</li>
                          <li><span className="point3"></span> Contry 3</li>
                          <li><span className="point4"></span> Contry 4</li>
                          <li><span className="point5"></span> Contry 5</li>
                          <li><span className="point6"></span> Contry 6</li>
                          <li><span className="point7"></span> Contry 7</li>
                          <li><span className="point8"></span> Contry 8</li>
                          <li><span className="point8"></span> Contry 9</li>
                          <li><span className="point8"></span> Contry 10</li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-xl-7">
                      <div className="ljpChartInsides h-100 d-table w-100">
                        <div className="ljpGraphChartFive position-relative d-table-cell align-middle">
                          <div id="ljpTopCountries"><TopCountriesChart /></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-12 pb-4">
                <div className="FullViews card fullAllCards">
                  <div className="row m-0">
                    <div className="col-xl-5 p-0">
                      <div className="cardTitles p-3">
                        <div>
                          <h5 className="m-0">Top Cities</h5>
                          <p className="m-0">By Sessions</p>
                        </div>
                      </div>
                      <div className="indicatorLists px-3">
                        <ul className="list-unstyled IndiLists">
                          <li><span className="point1"></span> City 1</li>
                          <li><span className="point2"></span> City 2</li>
                          <li><span className="point3"></span> City 3</li>
                          <li><span className="point4"></span> City 4</li>
                          <li><span className="point5"></span> City 5</li>
                          <li><span className="point6"></span> City 6</li>
                          <li><span className="point7"></span> City 7</li>
                          <li><span className="point8"></span> City 8</li>
                          <li><span className="point1"></span> City 9</li>
                          <li><span className="point2"></span> City 10</li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-xl-7">
                      <div className="ljpChartInsides h-100 d-table w-100">
                        <div className="ljpGraphChartFive position-relative d-table-cell align-middle">
                          <div id="ljpTopCities"><TopCitiesChart /></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
  );
}

export default Analytics;
