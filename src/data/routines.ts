export type RoutineStep = {
  id: string;
  title: string;
  description: string;
  content?: string;
  questions?: string[];
  type: 'evocation' | 'meditation' | 'word-prayer' | 'free-prayer' | 'contemplation' | 'reading' | 'self-check';
};

export type Routine = {
  id: string;
  title: string;
  duration: string;
  description: string;
  steps: RoutineStep[];
};

export const routines: Routine[] = [
  {
    id: 'morning',
    title: '아침 기도',
    duration: '25분',
    description: '하루를 시작하며 하나님께 나아가는 깊은 기도의 시간',
    steps: [
      {
        id: 'm1',
        title: '하나님께 나가기 (마음잡기)',
        description: '말씀을 읽고 기도할 때 하나님이 임하셔서 도와주시길 요청하세요. 다음 본문을 읽으며 마음을 잡고 영적인 준비를 갖춥니다.',
        type: 'evocation'
      },
      {
        id: 'm2',
        title: '성경 읽기와 묵상',
        description: '시편 95편, 혹은 평소 순서대로 읽고 있는 성경 본문 1장을 읽고 묵상합니다. 본문을 3-4번 읽으며 아래 질문들을 통해 깊이 묵상해보세요.',
        type: 'meditation',
        questions: [
          '본문은 하나님(성부, 성자, 성령)에 관해 무슨 이야기를 하고 있나요?',
          '자신에 관해 어떤 가르침을 주나요?',
          '따라야 할 본보기와 지켜야 할 명령(또는 피해야 할 잘못), 당당히 주장해야 할 약속은 무엇인가요?',
          '본문은 죄에 대해 무엇을 알려 주나요? 고백하고 회개해야 할 점은 무엇인가요?',
          '본문은 내게 부족하거나 필요한 게 무엇이라고 지적하나요?',
          '예수 그리스도나 그분 안에서 받아 누리는 은혜는 주께 고백한 죄를 극복하고 부족이나 필요에 대처하는 데 어떻게 결정적인 도움을 주나요?'
        ]
      },
      {
        id: 'm3',
        title: '기도',
        description: '묵상한 내용 하나하나를 두고 기도하세요. 고백, 간구, 예수님이 베풀어 주신 구원에 대한 감사 등의 요소들을 기억하며 기도합니다.',
        type: 'word-prayer'
      },
      {
        id: 'm4',
        title: '자유 기도',
        description: '개인적인 필요와 마음을 짓누르는 염려를 두고 자유롭게 기도하세요. 찬양, 고백, 간구의 균형을 맞추어 봅니다.',
        type: 'free-prayer'
      },
      {
        id: 'm5',
        title: '관상',
        description: '마지막 단계에서는 그저 하나님과 그분의 임재를 즐거워하며 기뻐하세요. 조용히 머무르며 주님의 사랑을 누립니다.',
        type: 'contemplation'
      }
    ]
  },
  {
    id: 'midday',
    title: '한낮 기도',
    duration: '5분',
    description: '바쁜 일상 속에서 잠시 멈추어 하나님을 기억하는 시간',
    steps: [
      {
        id: 'd1',
        title: '말씀 읽기',
        description: '시편 103편을 읽고 기도합니다.',
        type: 'reading'
      },
      {
        id: 'd2',
        title: '주기도문 기도',
        description: '주기도문을 자신의 말로 옮기며 기도합니다.',
        type: 'word-prayer'
      },
      {
        id: 'd3',
        title: '자기 점검 및 자유 기도',
        description: '오늘 하루의 마음가짐을 돌아보고, 당장 해결해야 할 문제들을 위해 자유로이 기도합니다.',
        type: 'self-check',
        questions: [
          '쉽게 성을 내고 교만했는가, 아니면 너그럽고 겸손했는가?',
          '차갑고 냉랭했는가, 아니면 따뜻하고 친절했는가?',
          '초조해하고 스트레스를 받는 편이었는가, 아니면 하나님께 의지했는가?',
          '비겁했는가, 아니면 정직했는가?'
        ]
      }
    ]
  },
  {
    id: 'evening',
    title: '저녁 기도',
    duration: '15-20분',
    description: '하루를 마무리하며 하나님의 은혜를 돌아보는 시간',
    steps: [
      {
        id: 'e1',
        title: '하나님께 다가서기',
        description: '말씀을 읽고 기도할 때 하나님이 임하셔서 도와주시길 요청하세요.',
        type: 'evocation'
      },
      {
        id: 'e2',
        title: '성경 읽기와 묵상',
        description: '시편을 읽고 묵상합니다. 본문이 하나님의 어떤 면모를 보여주는지, 찬양하고 감사해야 할 점은 무엇인지 적어보세요.',
        type: 'meditation'
      },
      {
        id: 'e3',
        title: '시편으로 기도하기',
        description: '읽은 시편의 내용을 기도로 바꿔 하나님께 올려 드립니다.',
        type: 'word-prayer'
      },
      {
        id: 'e4',
        title: '회개와 중보',
        description: '하루를 돌아보며 지은 죄를 고백하고, 도움이 필요한 이들과 마음에 떠오르는 일들을 위해 기도하세요.',
        type: 'free-prayer'
      }
    ]
  },
  {
    id: 'beginner',
    title: '처음 시작하는 이를 위한 기도',
    duration: '15분',
    description: '기도가 낯선 분들을 위한 쉽고 단순한 기도 가이드',
    steps: [
      {
        id: 'b1',
        title: '하나님께 나가기',
        description: '기도라는 특권에 관해 생각하세요. 하나님이 임하여 계신다는 사실을 마음에 새기고, 기도를 도와주시길 구합니다.',
        type: 'evocation'
      },
      {
        id: 'b2',
        title: '묵상',
        description: '성경 본문을 읽고 가르침을 주는 한두 가지 진리를 분별합니다. 가장 마음에 와 닿는 구절을 골라보세요.',
        type: 'meditation',
        questions: [
          '이 진리는 어떤 면에서 하나님을 찬양하게 하나요?',
          '어떤 죄를 보여 주며 고백하기를 요구하나요?',
          '어떤 점을 하나님께 간구하게 하나요?'
        ]
      },
      {
        id: 'b3',
        title: '말씀 기도',
        description: '묵상하며 답한 세 가지 질문(찬양, 탄원, 간구)을 기도로 바꿉니다.',
        type: 'word-prayer'
      },
      {
        id: 'b4',
        title: '자유 기도',
        description: '무엇이든 마음에 떠오르는 대로 필요를 주께 구하세요. 주님이 삶 가운데 역사하시고 보살펴 주심에 감사하는 시간을 가집니다.',
        type: 'free-prayer'
      },
      {
        id: 'b5',
        title: '관상',
        description: '오늘 알려 주신 진리를 기억하며 잠시 하나님을 경배합니다. 짧은 찬양으로 마칩니다.',
        type: 'contemplation'
      }
    ]
  }
];
