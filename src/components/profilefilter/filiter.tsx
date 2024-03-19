import React, { useState } from 'react';
import "./styles.scss"
import { Checkbox } from 'antd';
import API from './services/index';
import { Card } from 'antd';
import { Link } from 'react-router-dom';
import { Input, Space } from 'antd';
import "./styles.scss"
const { Meta } = Card;
const { Search } = Input;

const initialFilterState = { type: [] };
const filterOptions = {
    types: [
        { label: 'SCM', value: 'SCM' },
        { label: 'BTS', value: 'BTS' },
    ]
}
const FilterProfiles: React.FC = () => {
    const [showServices, setShowServices] = useState<boolean>(false);
    const [data, setData] = useState<any[]>([]);
    const [searched, setSearched] = React.useState<string>('');
    const [filterState, setFilterState] = React.useState(initialFilterState);


    const onChange = (e: string[]) => {
        setFilterState((prev) => ({ ...prev, type: e as any }))
        setShowServices(!showServices);
    };

    const getData = async () => {
        let criterias = [
            { "property": "/type", "operator": "=", "values": ["SCM"] }
        ];
        const { type } = filterState;

        if (Boolean(searched)) {
            criterias = [...criterias, { "property": "/name", "operator": "LIKE", "values": [searched] }]
        } else if(type && type.length > 0) {
            criterias = [...criterias, { "property": "/type", "operator": "=", "values": type }]
        } 

        const payload = {
            "filter": {
                "and": criterias
            },
            "pagination": {
                "offset": 0,
                "limit": 10
            }
        }
        try {
            const response = await API.searchservices.serviceProfiles(payload);
            const responseData = response.data.data;
            setData(responseData)
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    const filiterbyNames = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        setSearched(inputValue);
    };

    React.useEffect(() => {
        getData();
    }, [searched, filterState]);

    return (
        <>
            <div className="globalbox_div">
                <div className="globalbox_div_child">
                    <h3 className="globalbox_div_child_1">Create an Integration to:</h3>
                    <Space direction="vertical" size= "middle">
                            <Search  onChange={filiterbyNames} placeholder="Search Services" allowClear className='globalbox_div_child_2 ' />
                    </Space>
                </div>

            </div>
            <div className='filiter_main_div'>

                <div className='filiter_main_div_child_1'>
                    <Checkbox.Group
                        options={filterOptions.types}
                        onChange={(e) => onChange(e as any)}
                        value={filterState.type}
                        className='filiter_main_div_child_1_sub'
                        style={{ display: 'flex', flexDirection: 'column' }}
                    />
                </div>
                <div className='filiter_main_div_child_2'>
                    <p className="header">Frequent Integrations:</p>
                    <div className="card_wrapper">
                        {data.map((item) => (
                            <Card
                                hoverable
                                style={{ width: 300}}
                                cover={<img alt="example" src={item.image.large} className='card_antd' />}
                            >
                                <Meta title={item.name}  description={item.description}/>
                                {/* <Meta description={item.description} className='description_lat'/> */}
                                <Link to={`/serviceProfiles/${item.id}/integration/create`} className="service-link">
                                    <button >Select Service</button>
                                </Link>

                            </Card>

                        ))}
                    </div>
                </div>


            </div>
        </>
    );
};

export default FilterProfiles;

