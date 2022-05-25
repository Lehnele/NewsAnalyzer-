import React, {useEffect, useState} from 'react';
import {
    Button,
    Card, CardActions,
    CardContent,
    Divider,
    List,
    SwipeableDrawer,
    Typography
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ManageSearchRoundedIcon from '@mui/icons-material/ManageSearchRounded';
import {connect} from "react-redux";
import {getSearchHistory, insertHistorySettings} from "../../store/actions/Archive";

import {Link} from "react-router-dom";

const Archive = props => {
    const [open, setOpen] = useState(false)

    const source = [
        'Lenta.ru',
        'Риа новости',
        'ТАСС',
        'Комсомольская правда'
    ]

    useEffect(() => {
        props.getSearchHistory()
    }, [open])

    const renderArchiveCards = searchHistory => {
        return searchHistory.map((item, index) => {
            return (
                <Card key={index} variant="outlined">
                    <CardContent>
                        <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                            {item.Date}
                        </Typography>
                        <Typography variant="h5" component="div">
                            {item.AnalyzeType}
                        </Typography>
                        <Typography sx={{mb: 1.5}} color="text.secondary">
                            Источник: <strong>{source[item.Request.source - 1]}</strong>
                        </Typography>
                        <Typography variant="body2">
                            Анализ по {item.Request.analyze_by}
                            {item.Request?.news_count ? <><br/>Новостей: <strong>{item.Request.news_count}</strong></> : null}
                            {item.Request?.words_count ? <><br/>Слов: <strong>{item.Request.words_count}</strong></> : null}
                            {item.Request?.categories ? <><br/>Категории: <strong>{item.Request?.categories.map(item => `${item},`)}</strong></> : null}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button
                            onClick={() => {
                                setOpen(false);
                                props.insertHistorySettings(props.searchHistory[index])
                            }}>
                            <Link
                                to={item.AnalyzeType == 'POPULAR_WORDS'
                                    ? '/popular-words'
                                    : item.AnalyzeType == 'ACTIVITY'
                                        ? '/activity'
                                        : item.AnalyzeType == 'ACTIVITY_BY_CATEGORIES'
                                            ? '/activity-by-categories'
                                            : 'popular-words'
                                }
                                style={{textDecoration: 'none', color: '#1565c0'}}
                            >Использовать</Link>
                        </Button>
                    </CardActions>
                </Card>
            )
        })
    }

    return (
        <div className='Archive'>
            <IconButton
                size="large"
                onClick={() => setOpen(true)}
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="default"
                sx={{ml: 'auto'}}
            >
                <ManageSearchRoundedIcon/>
            </IconButton>
            <SwipeableDrawer anchor='left' open={open} onOpen={() => setOpen(true)} onClose={() => setOpen(false)}>
                <div>
                    <IconButton onClick={() => setOpen(false)}>
                        <ChevronRightIcon/>
                    </IconButton>
                </div>
                <Divider/>
                <List style={{maxHeight: '100%', overflow: 'auto'}}>
                    {renderArchiveCards(props.searchHistory)}
                </List>
            </SwipeableDrawer>
        </div>
    );
};

function mapStateToProps(state) {
    return {
        searchHistory: state.Archive.searchHistory
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getSearchHistory: () => dispatch(getSearchHistory()),
        insertHistorySettings: historyItem => dispatch(insertHistorySettings(historyItem))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Archive);