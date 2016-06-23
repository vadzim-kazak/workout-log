import {createReducer} from '../../../common/util/create-reducer';

export const untisOfMeasuresReducer = createReducer<{}>({}, {
    
    ['UNITS_OF_MEASURES_LOAD_SUCCESS'](state, action) {
        return Object.assign({}, this.groupMetricsBySystem(action.payload));  
    },

    groupMetricsBySystem(metrics) {

        let result = {};
        Object.keys(metrics).forEach(category => {

            result[category] = {};
            metrics[category].forEach(metric => {

                if (!result[category][metric.system]) {
                    result[category][metric.system] = [];
                }

                result[category][metric.system].push(metric);
                delete metric.system;
                metric.value = metric.value.toUpperCase();
            });

        });
       
        return result;
    }

});