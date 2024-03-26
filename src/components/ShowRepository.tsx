import React, { useState, useEffect } from 'react';
import API from "./profilefilter/services/index";
import { Alert, Space, Spin } from 'antd';
import Mainheader from './header/Index'
import "./styles.scss"
import { Typography, Button } from 'antd';

const { Paragraph } = Typography;

const ShowRepositories: React.FC = () => {
    const [repos, setRepos] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const getRepos = async () => {
        setLoading(true);
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
                "limit": 30
            }
        }
        try {
            const responses = await API.searchservices.searchRepos(payload1);
            const reposData = responses.data.data;
            setRepos(reposData);
            setError(null);
        } catch (error) {
            console.error("Error fetching data:", error);
            setError("Failed to fetch repositories. Please try again."); 
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getRepos();
    }, []);

    return (
        <>
            <Mainheader />
            {error ? ( 
                <Alert message={error} type="error" showIcon closable />
            ) : (
                <div className='border-4 border-gray-500 bg-slate-700 h-[25rem] text-white w-[70rem] mx-auto flex items-center justify-center hover:bg-slate-800'>
                    <div className='master'>
                        <Space direction="vertical" style={{ width: '100%' }}>
                            <Alert message="GitHub successfully connected" type="success" showIcon closable className='altbox' />
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
                                                <label htmlFor={`checkbox-${index}`}>{item.native_response.login}</label>
                                            </div>
                                        );
                                    })}
                                </div>
                                {repos.some(item => item.native_response.login) && ( 
                                    <Button className='bbtn' type='primary'>Import and Scan</Button>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default ShowRepositories;
