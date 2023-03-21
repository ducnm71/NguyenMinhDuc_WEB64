import React, { useEffect, useState } from 'react';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Layout, Menu, theme, Avatar} from 'antd';
import './Follower.css'
import axios from 'axios';
const { Header, Content, Footer, Sider } = Layout;


const Follower = () => {
    const {
        token: { colorBgContainer },
      } = theme.useToken();
    
      const [data, setData] = useState([])

      useEffect(() =>{
        axios.get('https://api.github.com/users/anhtbok92/followers')
        .then(async(res) => {
            await setData(res.data)
        })
        .catch(err => console.log(err))
      },[])

      return (
        <Layout style={{'min-height': '100vh'}}>
          <Sider
            breakpoint="lg"
            collapsedWidth="0"
            onBreakpoint={(broken) => {
              console.log(broken);
            }}
            onCollapse={(collapsed, type) => {
              console.log(collapsed, type);
            }}
          >
            <div className="logo" />
            <Menu
              theme="dark"
              mode="inline"
              defaultSelectedKeys={['4']}
              items={[UserOutlined, VideoCameraOutlined, UploadOutlined, UserOutlined].map(
                (icon, index) => ({
                  key: String(index + 1),
                  icon: React.createElement(icon),
                  label: `nav ${index + 1}`,
                }),
              )}
            />
          </Sider>
          <Layout>
            <Header style={{ padding: 0, background: colorBgContainer }} />
            <Content style={{ margin: '24px 16px 0' }}>
              <div style={{ padding: 60, minHeight: 360, background: colorBgContainer }}>
              {
                data.map((user, index) => (
                    <div key={user.id} className="flex items-center mb-6 pb-6 justify-between"
                        style={{ borderBottom: '1px solid #ccc',display:'flex', gap:'2rem'}}
                    >
                        <div className="flex items-center" style={{display:'flex', alignItems:'center'}}>
                            <p className="mr-8 mb-0">#{index + 1}</p>
                            <Avatar src={user.avatar_url} size={48}  style={{marginLeft: '50px'}}/>
                            <div className="ml-4">
                                <p className="font-bold text-base mb-0">
                                    {user.login}
                                </p>
                                <a href={user.html_url} target="__blank" className="text-sm underline">
                                    Github Link
                                    </a>
                            </div>
                        </div>
                        
                    
                    </div>
                ))
            }
              </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
          </Layout>
        </Layout>
      );
}

export default Follower