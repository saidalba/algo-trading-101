import { InsidePipelineDiagram } from './InsidePipelineDiagram';
import { cpuStages, fpgaStages } from '../../data/pipelineStages';
import styles from './InsidePipeline.module.css';

export function InsidePipeline() {
  return (
    <div className={styles.grid}>
      <div className={styles.section}>
        <InsidePipelineDiagram
          title="INSIDE THE CPU"
          subtitle="one shared pipeline. every step in sequence."
          titleColor="#7f1d1d"
          stages={cpuStages}
        />
      </div>
      <div className={styles.section}>
        <InsidePipelineDiagram
          title="INSIDE THE FPGA"
          subtitle="every step carved into its own block."
          titleColor="#0c4a6e"
          stages={fpgaStages}
        />
      </div>
    </div>
  );
}
