import React, { useState } from 'react';
import { Button, message, Steps, Input, ButtonProps, Descriptions } from 'antd';
import { useNavigate } from 'react-router-dom';
import Mainheader from '../header/Index';
import "./styles.scss";
import API from '../profilefilter/services';
import { useParams } from 'react-router-dom';
import { Typography } from 'antd';
import { useSearchParams } from "react-router-dom";
import { CheckCircleFilled, CloseCircleFilled, ExclamationCircleOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const steps = [
    {
        title: 'Details',
        content: 'First-content',
    },
    {
        title: 'Access type',
        content: 'Second-content',
    },
    {
        title: 'Review',
        content: 'Last-content',
    },
];

const initialIntagrationValues = {
    orgName: '',
    accessType: '',
    apiKey: '',
    emailId: '',
    current: '0',
}

const Stepper: React.FC = () => {
    const [current, setCurrent] = useState<number>(0);
    const { profileId } = useParams();
    const [integrationalues, setIntegrationValues]: any = useSearchParams(initialIntagrationValues);
    const [data, setData] = useState<any>(undefined);
    const [connected, setConnected] = React.useState<'failed' | 'success' | false>('failed');
    const submitRef = React.useRef<any>(null);
    const [isOAuthSelected, setIsOAuthSelected] = useState(false);


    const next = () => {
        if (isOAuthSelected) {
            window.location.href = 'https://github.com/login/oauth/authorize?client_id=3b1db9e7e61e84a79656&scope=repo&redirect_uri=http://localhost:3000';
        } else {
            handleUpdateFieldChange('current', `${current + 1}`);
        }
    };

    const prev = () => {
        handleUpdateFieldChange('current', `${current - 1}`)
    };

    const items = steps.map((item) => ({ key: item.title, title: item.title }));

    const getData = async () => {
        try {
            const response = await API.searchservices.serviceProfilesById(profileId as string);
            const responseData = response.data;
            setData(responseData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    function handleUpdateFieldChange(name: string, value: unknown) {
        setIntegrationValues((prev: any) => {
            prev.set(name, value as string);
            return prev;
        })
    }

    function handleSubmit() {
        submitRef.current.createIntegration()
    }

    type ButtonCb = () => ButtonProps
    const getButtonProps = React.useCallback((): { prev: ButtonCb, next: ButtonCb } => {
        let defaultProps: ButtonProps = {};
        function prev() {
            return defaultProps
        }
        function next() {
            if (current === 0) {
                if (Boolean(!integrationalues.get('orgName') || !integrationalues.get('accessType'))) {
                    defaultProps = { ...defaultProps, disabled: true }
                }
            }
            else if (current === 1) {
                if (!connected || connected === 'failed') {
                    defaultProps = { ...defaultProps, disabled: true }
                }
            }
            return defaultProps
        }
        return { prev, next }
    }, [current, integrationalues, connected]);

    React.useEffect(() => {
        getData();
    }, []);

    React.useEffect(() => {
        setCurrent(+integrationalues.get('current'))
    }, [integrationalues.get('current')])

    let MainBannerComponent: any;
    switch (current) {
        case 0:
            MainBannerComponent = MainBannerDetails;
            break;
        case 1:
            MainBannerComponent = MainBannerAccessType;
            break;
        case 2:
            MainBannerComponent = MainBannerReview;
            break;
        default:
            MainBannerComponent = MainBannerDetails;
    }

    const handleOAuthSelect = (isSelected: boolean) => {
        setIsOAuthSelected(isSelected);
    };
    return (
        <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
            <Mainheader />
            <Steps current={current} items={items} style={{ padding: '1rem', position: 'sticky', top: 0, left: 0, zIndex: 10, background: 'var(--gray-50)' }} />
            {
                data && (
                    <MainBannerComponent
                        accessPointConfigs={data?.accessPointConfigs}
                        handleUpdateFieldChange={handleUpdateFieldChange}
                        orgName={integrationalues.get('orgName')}
                        selectedType={integrationalues.get('accessType')}
                        apiKey={integrationalues.get('apiKey')}
                        emailId={integrationalues.get('emailId')}
                        data={data}
                        setConnected={setConnected}
                        connected={connected}
                        ref={submitRef}
                        name={data?.name}
                        onOAuthSelect={handleOAuthSelect}
                    />
                )
            }
            <div className='stepperbelow'>
                <div>
                    {current > 0 && (
                        <Button style={{ margin: '0 8px' }} onClick={() => prev()}  {...getButtonProps().prev()} >
                            Previous
                        </Button>
                    )}
                </div>
                {current < steps.length - 1 && (
                    <div style={{ display: 'flex', gap: 5, alignItems: 'center' }} >
                        {
                            current === 1 && (
                                <Button
                                    size='middle'
                                    type='link'
                                >
                                    Test Connection
                                </Button>
                            )
                        }
                        {isOAuthSelected===true? <Button type='primary' onClick={() => next()} {...getButtonProps().next()}>
                            Authenticate Github
                        </Button>:<Button type='primary' onClick={() => next()} {...getButtonProps().next()}>
                            Next
                        </Button>}
                        
                    </div>
                )}

                {current === steps.length - 1 && (
                    <Button type='primary' onClick={handleSubmit}>
                        Submit
                    </Button>
                )}
            </div>
        </div>
    );
};

const MainBannerReview = React.forwardRef((props: any, ref) => {
    const navigate = useNavigate();

    const payload = React.useMemo(() => {
        const tmp = {
            name: props.orgName,
            "subOrganization": {
                "name": "Phonepe Inc",
                "externalKey": "l946c690-32d0-4960-a447-48fe4fa9fd43"
            },
            target: {
                accessPoint: {
                    type: 'SP',
                    serviceProfile: {
                        id: props.data.id
                    },
                    accessPointConfig: {
                        type: props?.selectedType
                    },
                    emailAddress: props.emailId,
                    apiKey: props?.apiKey
                }
            }
        };
        return tmp;
    }, []);

    React.useImperativeHandle(ref, () => {
        return { createIntegration };
    }, [ref]);

    const createIntegration = async () => {
        try {
            await API.searchservices.createIntegration(payload);
            message.success('Integration Successfully Done')

            setTimeout(navigate, 1000, '/Integration_completed')
        } catch (error: any) {
            let errMsg = 'Integration Failed'
            if (error.response.data && Array.isArray(error.response.data)) {
                const [err] = error.response.data;
                if (err && err.errorMessage) {
                    errMsg = err.errorMessage;
                }
            }
            message.error(errMsg)
        }
    }

    return (
        <div className='mainbanner' style={{ flex: 1 }}>
            <Descriptions title={<Title level={3}>Review Integration</Title>}>
                <Descriptions.Item label="Name">{payload.name}</Descriptions.Item>
                <Descriptions.Item label="Access Type">{payload.target.accessPoint.accessPointConfig.type}</Descriptions.Item>
                <Descriptions.Item label="API Key">{payload.target.accessPoint.apiKey}</Descriptions.Item>
                <Descriptions.Item label="Email">{payload.target.accessPoint.emailAddress}</Descriptions.Item>
                <Descriptions.Item label="Service Profile" style={{ textTransform: 'capitalize' }}>
                    {props.data.name.toLowerCase()}
                </Descriptions.Item>
                <Descriptions.Item label="ServiceProfile Id">
                    {props.data.id.toLowerCase()}
                </Descriptions.Item>
                <Descriptions.Item label="Type">
                    {payload.target.accessPoint.type}
                </Descriptions.Item>
            </Descriptions>
        </div>
    )
});

function MainBannerAccessType({
    accessPointConfigs,
    handleUpdateFieldChange,
    emailId,
    apiKey,
    setConnected,
}: any) {
    const [validation, setValidation] = React.useState<{ [key: string]: boolean }>({
        emailId: false,
        apiKey: false
    });

    const handleInputChangeApikey = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleUpdateFieldChange('apiKey', e.target.value)
    };

    const handleInputChangEmailid = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConnected(false);
        handleUpdateFieldChange('emailId', e.target.value)
    };

    const testConnectionHadler = () => {
        let field = { emailId: false, apiKey: false }
        if (accessPointConfigs && accessPointConfigs.length > 0) {
            const [config] = accessPointConfigs;
            if (config.fieldTypeConfigs && config.fieldTypeConfigs.length > 0) {
                config.fieldTypeConfigs.forEach((fieldConfig: any) => {
                    if (fieldConfig.type.trim().toUpperCase() === 'EMAIL') {
                        const pattern = new RegExp(fieldConfig.regex);
                        const isValid = pattern.test(emailId);
                        field = { ...field, emailId: isValid }
                        setValidation((prev) => ({ ...prev, emailId: isValid }))
                    }
                })
            }
        }
        const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
        const isValid = uuidRegex.test(apiKey);
        field = { ...field, apiKey: isValid }
        if (Object.values(field).every((item) => Boolean(item))) {
            setConnected('success')
        } else {
            setConnected('failed')
        }
        setValidation((prev) => ({ ...prev, apiKey: isValid }));
    };

    const resolvedIcon = React.useCallback(() => {
        function email() {
            let tempProps = {};
            if (emailId) {
                tempProps = { ...tempProps, suffix: validation.emailId ? <CheckCircleFilled style={{ color: 'var(--success-700)' }} /> : <CloseCircleFilled style={{ color: 'var(--error-600)' }} /> }
            } else {
                tempProps = { ...tempProps, suffix: <ExclamationCircleOutlined style={{ color: 'var(--primary-600)' }} /> }
            }
            return tempProps;
        }
        function key() {
            let tempProps = {};
            if (apiKey) {
                tempProps = { ...tempProps, suffix: validation.apiKey ? <CheckCircleFilled style={{ color: 'var(--success-700)' }} /> : <CloseCircleFilled style={{ color: 'var(--error-600)' }} /> }
            } else {
                tempProps = { ...tempProps, suffix: <ExclamationCircleOutlined style={{ color: 'var(--primary-600)' }} /> }
            }
            return tempProps;
        }

        return { key, email };
    }, [validation]);

    React.useEffect(() => {
        testConnectionHadler();
    }, [emailId, apiKey])

    return (
        <div className='mainbanner' style={{ flex: 1 }} >
            <Title level={3}>Access type</Title>
            <div className='mainbanner_child_1'>
                {accessPointConfigs.map((config: any, index: number) => {
                    return <p key={index} className='paragraphtag'>{config.label}:</p>
                })}

                <Input allowClear {...resolvedIcon().key()} value={apiKey} placeholder="eg: 0f02aa71-02ca-4cc6-b942-ca4b2fbeb8f3" className='Inputorg' onChange={handleInputChangeApikey} />
            </div>
            <div className='mainbanner_child_1'>
                <p className='paragraphtag'>Email:</p>
                <Input
                    value={emailId}
                    placeholder="eg: jhonroy@acme.com"
                    className='Inputorg'
                    onChange={handleInputChangEmailid}
                    {...resolvedIcon().email()}
                    allowClear
                />
            </div>
        </div>
    );
}


function MainBannerDetails({
    accessPointConfigs,
    handleUpdateFieldChange,
    orgName,
    selectedType,
    name,
    onOAuthSelect,
}: any) {

    const labelMapper: any = {
        'APIKEY_FLW': {
            label: 'API Key'
        }
    }

    const handleButtonClick = (type: string) => {
        handleUpdateFieldChange('accessType', type === selectedType ? '' : type);
        if (type === 'OAuth') {
            onOAuthSelect(true);
        } else {
            onOAuthSelect(false);
        }
    };
   

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleUpdateFieldChange('orgName', e.target.value)
    };
    return (
        <div className='mainbanner' style={{ flex: 1 }}>
            <Title level={3}>Enter integration details</Title>
            <div className='mainbanner_child_1'>
                <p className='paragraphtag'>Name:</p>
                <Input allowClear value={orgName} placeholder="eg: ACME" className='Inputorg' onChange={handleInputChange} />
            </div>
            <div>
                <p className='paragraphtag'>Access type :</p>
                {accessPointConfigs.map((config: any, index: number) => (
                    <div key={index} className='Accesstype_dev_sepa'>
                        <Button
                            style={{ width: 383, border: selectedType === config.type ? '2px solid var(--primary-700)' : '2px solid var(--base-white)' }}
                            className='accessbox'
                            onClick={() => handleButtonClick(config.type)}
                        >
                            <Title style={{ margin: 0 }} level={5}>{labelMapper?.[config?.type]?.label || "-"}</Title>
                            <Paragraph  >
                                The APIKEY access type allows you to swiftly authenticate and access resources securely with a unique key, ensuring seamless integration and minimal overhead in the authentication process.
                            </Paragraph>
                        </Button>
                        {name === "GITHUB" ? <div>
                            <Button
                                style={{ width: 383, border: selectedType === 'OAuth' ? '2px solid var(--primary-700)' : '2px solid var(--base-white)' }}
                                className='accessbox'
                                onClick={() => handleButtonClick('OAuth')}
                            >
                                <Title style={{ margin: 0 }} level={5}>{"OAuth"}</Title>
                                <Paragraph  >
                                    OAuth allows you to securely authorize third-party applications by granting them limited access to your resources without sharing your credentials, ensuring seamless integration.
                                </Paragraph>
                            </Button>

                        </div> : " "}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Stepper;
