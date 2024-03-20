import React, { useState } from 'react';
import API from "./profilefilter/services/index";
import { Alert, Space, Spin } from 'antd'; // Import Spin from Ant Design for loading indicator
import Mainheader from './header/Index'
import "./styles.scss"
import { Typography, Checkbox,Button } from 'antd';

const { Title, Paragraph } = Typography;


const ShowRepositories: React.FC = () => {
    const [repos, setRepos] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false); // State to manage loading

    const getRepos = async () => {
        setLoading(true); // Set loading to true when fetching data
        const payload1 = {
            "filter": {
                "and": [
                    {
                        "property": "/type",
                        "operator": "=",
                        "values": [
                            "STANDARD"
                        ]
                    }
                ]
            },
            "pagination": {
                "offset": 0,
                "limit": 10
            }
        }
        try {
            const responses = await API.searchservices.searchRepos(payload1);
            const reposDatas = responses.data.data;
            setRepos(reposDatas);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false); // Set loading to false when data fetching is completed
        }
    }

    React.useEffect(() => {
        getRepos();
    }, []);

    return (
        <>
            <Mainheader />
            <div className='border-4 border-gray-500 bg-slate-700 h-[25rem] text-white w-[70rem] mx-auto flex items-center justify-center hover:bg-slate-800'>
                <div>
                    <Space direction="vertical" style={{ width: '100%' }}>
                        <Alert message="GitHub Successfully Connected" type="success" showIcon closable className='altbox' />
                    </Space>

                    <Paragraph>
                        Choose from your active repositories
                    </Paragraph>


                    {loading ? (
                        <Spin size="large" />
                    ) : (
                        <div className='maindiv'>
                            <div>
                                {repos.slice(0, 5).map((item: any, index) => {
                                    return (
                                        <div className='redbox' key={index}>
                                            <input type="checkbox" id={`checkbox-${index}`} />
                                            <label htmlFor={`checkbox-${index}`}>{item.name}</label>
                                        </div>
                                    );
                                })}
                            </div>
                            <Button className='bbtn' type='primary'>Import and scan</Button>
                        </div>

                    )}
                </div>
            </div>
        </>
    );
};

export default ShowRepositories;
