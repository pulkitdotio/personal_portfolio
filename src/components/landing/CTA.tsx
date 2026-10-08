import RepeatSeparator from '../ui/repeat-separator';
import SectionHeading from '../common/SectionHeading';
import EmailForm from '../contact/EmailForm';

const CTA = () => {
  return (
    <>
      <RepeatSeparator />
      <SectionHeading heading="Contact" classname="mb-3" />
      <div className="mx-auto w-full max-w-178.75 px-6 py-8 sm:px-8">
        <p className="mb-6 text-sm text-muted-foreground">
          Open to opportunities. The best way to reach me is by email.
        </p>
        <EmailForm />
      </div>
    </>
  );
};

export default CTA;
