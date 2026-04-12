import TeamMemberCard from '../cards/TeamMemberCard';
import SectionHeading from '../../../shared/components/SectionHeading';

function AboutTeamSection({ team }) {
  return (
    <section className="about-team section-block">
      <div className="content-container">
        <SectionHeading
          title="Đội Ngũ Chuyên Gia"
          description="Những người đứng sau các hành trình hoàn hảo của bạn."
          action={
            <button className="text-action" type="button">
              Tất cả thành viên
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          }
        />

        <div className="about-team__grid">
          {team.map((member) => (
            <TeamMemberCard key={member.name} {...member} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default AboutTeamSection;
